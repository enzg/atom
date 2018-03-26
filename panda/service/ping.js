import { Response } from '../../core/net/io'

export class PingService {
  static PingResponse () {
    return async ctx => {
      ctx.body = Response.Ok({ message: 'pong' })
    }
  }
}
