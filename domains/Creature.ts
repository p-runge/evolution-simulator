import Genome from './Genome'
import Position from './Position'

export default class Creature {
  public position: Position
  public genome: Genome

  // exclude
  public static FIELD_SIZE = 128

  constructor(genomeLength: number, position: Position) {
    this.genome = new Genome(genomeLength)
    this.position = position
  }

  public decodeGenome(): void {
    console.log(this.position)
  }
}
