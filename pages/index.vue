<template>
  <div>
    <section>
      <h2>Brain Chart</h2>
      <network-vis :neurons="allNeurons" class="vis" />
    </section>
    <section>
      <h2>Brain Data</h2>
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
    </section>
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
  computed: {
    allNeurons(): Neuron[] {
      return Object.values(this.network || {}).reduce((a, b) => a.concat(b), [])
    },
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
          console.log(`trigger MOTOR ${neuron.toJSON()}`)
        },
      } as MotorNeuron),
      new Neuron({
        _outputFunction: (neuron: Neuron) => {
          console.log(`trigger MOTOR ${neuron.toJSON()}`)
        },
      } as MotorNeuron),
      new Neuron({
        _outputFunction: (neuron: Neuron) => {
          console.log(`trigger MOTOR ${neuron.toJSON()}`)
        },
      } as MotorNeuron),
    ]

    this.network = new Network(sensoryNeurons, motorNeurons, 5, 0.2)
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
*,
pre {
  color: #7d5f8e;
}
section:not(:last-child) {
  margin-bottom: 2rem;
}
.data-wrapper {
  display: flex;
  justify-content: space-between;
}
.vis {
  border: 1px solid #7d5f8e;
}
</style>
