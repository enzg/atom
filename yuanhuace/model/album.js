import _ from 'lodash'
import { Model } from '../../core/model/atom'
import { Query } from '../../core/aws/dynamo'
import { mockAlbums, mockPhotos } from '../mock'

export class Album extends Model {
  static get schema () {
    return {
      tag: 'string', // default is NULL! PK
      gid: 'string-uuid',
      title: 'string',
      cover: 'string',
      photos: 'array',
      likes: 'number',
      views: 'number'
    }
  }
  static get TableName () {
    return 'Album_yuanhuace'
  }
  static Find$ (gid, tag = this.DEFAULT_STRING) {
    return Query.From(this.TableName)
      .where('tag = :tag and gid = :gid')
      .limit(1)
      .select('title,cover,photos,tag,gid')
      .prepare({ ':tag': tag, ':gid': gid })
      .mock({ Items: mockAlbums(1, tag) })
      .run$()
      .then(ret => ret.Items.length ? ret.Items[0] : {})
  }
  static Query$ (tags) {
    const querys = _.map(tags, tag => {
      return Query.From(this.TableName)
        .where('tag = :tag')
        .select('title,cover,photos,likes,views,tag')
        .prepare({ ':tag': tag })
        .mock({ Items: mockAlbums(20, tag) })
        .run$()
        .then(ret => ret.Items)
    })

    return Promise.all(querys).then(ret => _.flatMap(ret, item => item))
  }
}
export class Photo extends Model {
  static get TableName () {
    return 'Photo_yuanhuace'
  }
  static get schema () {
    return {
      gid: 'string-uuid', // PK
      url: 'string', // the photo url
      desc: 'string' // the photo describe
    }
  }
  static Query$ (keys) {
    const querys = _.map(keys, key => {
      return Query.From(this.TableName)
        .where('gid = :gid')
        .select('url,desc,gid')
        .prepare({ ':gid': key })
        .mock({ Items: mockPhotos(20, key) })
        .run$()
        .then(ret => ret.Items)
    })

    return Promise.all(querys).then(ret => _.flatMap(ret, item => item))
  }
}
