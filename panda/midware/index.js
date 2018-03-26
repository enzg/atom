import { Response } from '../../core/net/io'
import { Log } from '../../core/logger'
export class Runtime {
  /**
   * Catch error
  */
  static ErrorWare () {
    return async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        Log.error('[runtime error]', err.stack)
        ctx.body = Response.Err(err, 5001)
      }
    }
  }
  /**
   * Log info
  */
  static LogWare () {
    return async (ctx, next) => {
      Log.info('[Request]', ctx.request)
      await next()
      Log.info('[Response Body]', ctx.body)
    }
  }
}
