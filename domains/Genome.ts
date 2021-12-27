import { hexGenerator } from '@/utils'

export default class Genome {
  private genes: string[]

  constructor(size: number) {
    this.genes = []
    while (size > 0) {
      this.genes.push(hexGenerator(4))
      size--
    }
  }

  get value(): string {
    return this.genes.join(' ')
  }
}
