import Random from 'random-js'
const Ran = new Random(Random.engines.mt19937().autoSeed())

export const Rng = (range = 0, start = 0) => Ran.integer(start, range)
