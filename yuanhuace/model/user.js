import _ from 'lodash'
import { Model } from '../../core/model/atom'
import { Query } from '../../core/aws/dynamo'
export class User extends Model {
  static get schema () {
    return {
      gid: 'string-uuid',
      nick: 'string'
    }
  }
  static get TableName () {
    return 'User_yuanhuace'
  }
  static async Auth$ ({
    username = User.DEFAULT_STRING,
    password = User.DEFAULT_STRING
  }) {
    return Query
      .From(User.TableName)
      .where('username = :username')
      .select('gid,salt,safe')
      .limit(1)
      .prepare({ ':username': username })
      .mock({
        Items: [{
          gid: 'appleseedez',
          salt: 'apple',
          safe: User.SignPass('123456', 'apple')
        }]
      })
      .run$()
      .then(ret => {
        if (User.SignPass(password, (ret.Items[0].salt || 'NULL!')) === (ret.Items[0].safe || 'NULL!')) {
          return [
            _.pick(ret.Items[0], ['gid'])
          ]
        } else {
          return []
        }
      })
  }
}
