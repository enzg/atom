import { Response } from '../../core/net/io'

export class SyncService {
  static SyncPlayerResponse () {
    return async ctx => {
      ctx.body = Response.Ok({message: 'Sync players info success'})
    }
  }
  static SyncLordResponse () {
    return async ctx => {
      ctx.body = Response.Ok({message: 'Sync lords info success'})
    }
  }
  static SyncPlayerWare () {
    return async (ctx, next) => {
      await next()
    }
  }
  static SyncLordWare () {
    return async (ctx, next) => {
      await next()
    }
  }
}
