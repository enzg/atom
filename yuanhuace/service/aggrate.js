import { Resource } from '../../core/model/atom'
import { Response } from '../../core/net/io'
import { Aggrate } from '../model/aggrate'
import { Category } from '../model/category'
import _ from 'lodash'

export class AggrateQueryServervice extends Resource {
  static List () {
    return async ctx => {
      const tables = ctx.query.c || _.map(Category.cates, item => item['class'])
      const keys = ctx.query.q.split(',')
      console.log('tables:', tables)
      const dataItems = await Aggrate.Query$(keys, tables)
      ctx.body = Response.Ok({
        count: dataItems.length,
        data: dataItems,
        tags: keys
      })
    }
  }
}
