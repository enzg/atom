import { Model } from '../../core/model/atom'
import { Album } from './album'
import { Design } from './design'
import _ from 'lodash'
export class Aggrate extends Model {
  static Query$ (keys, tables) {
    tables = tables.push ? tables : [tables]
    console.log(tables)
    const querys = _.map(tables, t => {
      if (t === 'Album') {
        return Album.Query$(keys)
      } else if (t === 'Design') {
        return Design.Query$(keys)
      } else if (t === 'Event') {
        return Promise.resolve([])
      }
    })
    console.log(querys)
    return Promise.all(querys).then(ret => _.flatten(ret))
  }
}
