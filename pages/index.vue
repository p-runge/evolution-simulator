<template>
  <div>
    <b-button @click="readNetwork">Read</b-button>
    <b-row class="data-wrapper">
      <template v-if="network">
        <b-col
          v-for="(neurons, index) in Object.values(network.toJSON())"
          :key="index"
          cols="4"
        >
          <pre><code>{{ neurons }}</code></pre>
        </b-col>
      </template>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MotorNeuron, Neuron, SensoryNeuron, Network } from 'neunet'

export default Vue.extend({
  data() {
    return {
      network: undefined as Network | undefined,
    }
  },
  created() {
    const sensoryNeurons = [
      new Neuron({
        _inputFunction: () => 0,
      } as SensoryNeuron),
      new Neuron({
        _inputFunction: () => 0.5,
      } as SensoryNeuron),
      new Neuron({
        _inputFunction: () => 1,
      } as SensoryNeuron),
    ]

    const motorNeurons = [
      new Neuron({
        _outputFunction: (neuron: Neuron) => {
          console.log('trigger MOTOR', neuron)
        },
      } as MotorNeuron),
      new Neuron({
        _outputFunction: (neuron: Neuron) => {
          console.log('trigger MOTOR', neuron)
        },
      } as MotorNeuron),
      new Neuron({
        _outputFunction: (neuron: Neuron) => {
          console.log('trigger MOTOR', neuron)
        },
      } as MotorNeuron),
    ]

    this.network = new Network(sensoryNeurons, motorNeurons, 3, 0.1)
  },
  methods: {
    readNetwork(): void {
      this.network?.read()
    },
  },
})
</script>

<style>
body {
  background-color: #272236;
}
pre {
  color: #7d5f8e;
}
.data-wrapper {
  display: flex;
  justify-content: space-between;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
