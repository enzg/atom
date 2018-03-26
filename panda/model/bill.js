import { Model } from '../../core/model/atom'

export class Bill extends Model {
  static get TableName () {
    return 'Bill_panda'
  }
}
