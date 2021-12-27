import Neuron from './Neuron'

export default class ActionNeuron implements Neuron {
  public name: string
  public execute: (context: any) => number

  constructor(name: string, execute: (context: any) => number) {
    this.name = name
    this.execute = execute
  }
}
