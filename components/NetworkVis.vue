<template>
  <div class="position-relative">
    <span class="position-absolute">
      <div v-for="(legendItem, index) in legend" :key="index" class="m-1">
        <b-badge
          :style="`font-size: 1rem; background-color: ${legendItem.color}`"
        >
          {{ legendItem.label }}
        </b-badge>
      </div>
    </span>
    <div :id="id" class="vis-network" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Network } from 'vis-network'
import { v4 as uuidv4 } from 'uuid'
import { Neuron, NeuronType } from 'neunet'

export default Vue.extend({
  props: {
    neurons: {
      type: Array as () => Neuron[],
      required: true,
    },
  },
  data() {
    return {
      id: `vis-network-${uuidv4()}`,
      legend: [
        {
          id: NeuronType.SENSORY,
          label: 'Sensory Neuron',
          color: '#33f',
        },
        {
          id: NeuronType.INNER,
          label: 'Inner Neuron',
          color: '#333',
        },
        {
          id: NeuronType.MOTOR,
          label: 'Motor Neuron',
          color: '#f33',
        },
      ],
    }
  },
  mounted() {
    // create an array with nodes
    const nodes = this.neurons.map(({ id, type }) => ({
      id,
      label: id,
      group: type,
    }))

    // create an array with edges
    const edges = this.neurons
      .map((neuron) => {
        return neuron.outputConnections || []
      })
      .reduce((a, b) => a.concat(b), [])
      .map(({ from, to, weight }) => {
        const strength = from.getOutputValue() * weight

        return {
          from: from.id,
          to: to.id,
          color: strength > 0 ? '#00ff00' : '#ff0000',
          width: Math.ceil(Math.abs(strength)) * 2,
        }
      })

    // create a network
    const container = document.getElementById(this.id) as HTMLElement
    const data = {
      nodes,
      edges,
    }
    const options = {
      interaction: {
        zoomView: false,
      },
      // physics: false,
      layout: {
        randomSeed: 69420,
        // hierarchical: {
        //   direction: 'LR',
        //   sortMethod: 'directed',
        //   shakeTowards: 'roots',
        // },
      },
      groups: {
        useDefaultGroups: false,
        ...Object.values(this.legend)
          .map(({ id, color }) => ({
            [id]: {
              color,
              font: '18px Arial #fff',
            },
          }))
          .reduce((a, b) => Object.assign(a, b)),
      },
      edges: {
        arrows: { to: true },
      },
    }
    // eslint-disable-next-line no-new
    new Network(container, data, options)
  },
})
</script>

<style scoped>
.vis-network {
  height: 500px;
}
</style>
