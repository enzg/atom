import { Resource } from '../../core/model/atom'
import { Tag } from '../model/tag'
import { Response } from '../../core/net/io'

export class TagService extends Resource {
  static List () {
    return async ctx => {
      const tags = await Tag.Query$(ctx.query.q.split(','))
      ctx.body = Response.Ok({ data: tags })
    }
  }
}
