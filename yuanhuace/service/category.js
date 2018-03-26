import { Resource } from '../../core/model/atom'
import { Category } from '../model/category'
import { Response } from '../../core/net/io'

export class CategoryService extends Resource {
  static List () {
    return async ctx => {
      ctx.body = Response.Ok({ data: Category.cates })
    }
  }
}
