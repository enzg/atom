import { SpecialGrid } from './template/special_grid'
import { Payload } from '../../core/model/atom'

export class SpinPayload extends Payload {
  static get schema () {
    return {
      viewGrid: 'array',
      specialGrid: 'specialGrid'
    }
  }
  static get schemaTypes () {
    return {
      'specialGrid': new SpecialGrid()
    }
  }
}
