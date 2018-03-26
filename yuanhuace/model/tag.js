import _ from 'lodash'
import { Model } from '../../core/model/atom'
import { Query } from '../../core/aws/dynamo'
import { mockTags } from '../mock'

export class Tag extends Model {
  static get schema () {
    return {
      type: 'string', // pk default NULL!
      name: 'string', //
      gid: 'string-uuid' // pk of items need to be unique
    }
  }
  static get TableName () {
    return 'Tag_yuanhuace'
  }
  static Query$ (types = [this.DEFAULT_STRING]) {
    const querys = _.map(types, type => {
      return Query.From(this.TableName)
        .where('type = :type')
        .select('name')
        .prepare({ ':type': type })
        .mock({ Items: mockTags(20, type) })
        .run$()
        .then(ret => ret.Items)
    })

    return Promise.all(querys).then(ret => _.flatMap(ret, item => item))
  }
}
