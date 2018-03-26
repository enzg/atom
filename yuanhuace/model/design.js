import _ from 'lodash'
import { Model } from '../../core/model/atom'
import { Query } from '../../core/aws/dynamo'
import { mockDesigns, mockArticles } from '../mock'

export class Design extends Model {
  static get TableName () {
    return 'Design_yuanhuace'
  }
  static get schema () {
    return {
      tag: 'string', // pk
      gid: 'string-uuid',
      likes: 'number',
      views: 'number',
      title: 'string',
      articles: 'array'
    }
  }
  static mock () {
    const mockObj = new this()
    mockObj.gid = 'gid of mock data'
    mockObj.title = 'title of mock data'

    return mockObj
  }
  static Query$ (tags) {
    const querys = _.map(tags, tag => {
      return Query
        .From(this.TableName)
        .where('tag = :tag')
        .select('title,cover,articles,likes,views,tag')
        .prepare({ ':tag': tag })
        .mock({ Items: mockDesigns(20, tag) })
        .run$()
        .then(ret => ret.Items)
    })
    return Promise.all(querys).then(ret => _.flatMap(ret, item => item))
  }
  static async Find$ (gid, tag = this.DEFAULT_STRING) {
    return Query.From(this.TableName)
      .where('tag = :tag and gid = :gid')
      .limit(1)
      .prepare({ ':tag': tag, ':gid': gid })
      .mock({Items: mockDesigns(1, tag)})
      .run$()
      .then(ret => ret.Items.length ? ret.Items[0] : {})
  }
}
export class Article extends Model {
  static get schema () {
    return {
      gid: 'string-uuid', // pk
      url: 'string', // the pic url
      author: 'string' // the work info
    }
  }
  static Query$ (keys) {
    const querys = _.map(keys, key => {
      return Query.From(this.TableName)
        .where('gid = :gid')
        .select('url,author,gid')
        .prepare({ ':gid': key })
        .mock({ Items: mockArticles(20, key) })
        .run$()
        .then(ret => ret.Items)
    })

    return Promise.all(querys).then(ret => _.flatMap(ret, item => item))
  }
}
