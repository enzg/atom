import { Payload } from '../../../core/model/atom'

export class SpecialGrid extends Payload {
  static get schema () {
    return {
      grid: 'array',
      type: 'string',
      isWin: 'bool-false'
    }
  }
}
