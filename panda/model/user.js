import { Model } from '../../core/model/atom'

export class User extends Model {
  static get TableName () {
    return 'User_panda'
  }
}
export class TrialUser extends User {
  static get TableName () {
    return 'TrialUser_panda'
  }
}
