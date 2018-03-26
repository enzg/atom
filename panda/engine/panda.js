import _ from 'lodash'
import Rx from 'rxjs/Rx'
import { Rng } from '../../core/rng'
import { GameConfig } from './config'

const $ = Rx.Observable
const ShuffleReel = reel => {
  return _.shuffle(_.reduce(reel, (result, value, key) => {
    return _.concat(result, _.fill(new Array(value), GameConfig.CardToKey[key]))
  }, []))
}

export class Pandora {
  static async open$ () {
    const cardReels$ = $.from(GameConfig.Cards)
    const result$ = $.from(_.fill(new Array(5), []))
    return $
      .zip(cardReels$, result$)
      .map(([cardReel, col]) => {
        const pickedCards = []
        _.times(3, count => {
          const reel = ShuffleReel(_.omit(cardReel, pickedCards))
          const pickedKey = reel[Rng(1e10) % reel.length]
          col.push(pickedKey)
          pickedCards.push()
        })
      })
  }
  static omitCards () {

  }
}
