import { Model } from '../../core/model/atom'
import { MixIn } from './mixin'

export class GameState extends Model {
  static get TableName () {
    return `GameState_panda`
  }
  static get schemaTypes () {
    return {
      'string-gid': MixIn.Gid(),
      'string-mode': MixIn.Mode()
    }
  }

  static get schema () {
    return {
      gid: 'string-gid',
      betIndex: 'number',
      levelIndex: 'number',
      mode: 'string-mode'
    }
  }
}
