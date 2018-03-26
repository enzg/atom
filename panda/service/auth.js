import { Response } from '../../core/net/io'

export class AuthService {
  static AuthWare () {
    return async (ctx, next) => {
      await next()
    }
  }
  static JWTWare () {
    return async (ctx, next) => {
      await next()
    }
  }
  static TrialUserWare () {
    return async (ctx, next) => {
      await next()
    }
  }
  static AuthResponse () {
    return async ctx => {
      ctx.body = Response.Ok({})
    }
  }
}
