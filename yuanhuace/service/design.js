import { Response } from '../../core/net/io'
import { Resource } from '../../core/model/atom'
import { Design, Article } from '../model/design'
export class DesignService extends Resource {
  static Show () {
    return async ctx => {
      const design = await Design.Find$(ctx.params.id)
      const articles = await Article.Query$([ctx.params.id])
      design.articles = articles
      ctx.body = Response.Ok({ data: [design] })
    }
  }
  static List () {
    return async ctx => {
      const keyWords = ctx.query.q || 'NULL!'
      const designs = await Design.Query$(keyWords.split(','))
      ctx.body = Response.Ok({
        count: designs.length,
        data: designs,
        tags: keyWords.split(',')
      })
    }
  }
  static Add () {
    return async ctx => {
      const data = Design.Modelize(ctx.request.body)
      await Design.Save$(data)
      ctx.redirect('/designs')
    }
  }
  static Edit () {
    return async ctx => {
      const result = await Design.Find$(ctx.params.id)
      const data = Design.Modelize(result, ctx.request.body)
      // make sure the id is not change
      data.gid = ctx.params.id
      await Design.Save$(data)
      ctx.redirect('/designs')
    }
  }
}
