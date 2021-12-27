import Creature from './Creature'
import Neuron from './Neuron'
import { lerp } from '@/utils'

export default class SensoryNeuron implements Neuron {
  public name: string
  public read: (context?: any) => number

  constructor(name: string, read: (context?: any) => number) {
    this.name = name
    this.read = read
  }
}

const distanceToLeftBorderNeuron = new SensoryNeuron(
  'DistanceToLeftBorder',
  (creature: Creature) => {
    return lerp(0, Creature.FIELD_SIZE, creature.position.x)
  }
)

export { distanceToLeftBorderNeuron }
