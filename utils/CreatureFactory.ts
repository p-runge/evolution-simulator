import Creature from '@/domains/Creature'

interface Options {
  genomeLength: number
}

const generate = (amount: number, { genomeLength }: Options): Creature[] => {
  const creatures: Creature[] = []

  while (amount > 0) {
    creatures.push(
      new Creature(genomeLength, {
        x: Math.floor(Math.random() * Creature.FIELD_SIZE),
        y: Math.floor(Math.random() * Creature.FIELD_SIZE),
      })
    )
    amount--
  }

  return creatures
}

export default {
  generate,
}
