import { Response } from '../../core/net/io'
import { SpinPayload } from '../payload/spin_payload'
import { GameState } from '../model/game_state'

export class GameService {
  static SpinGameWare () {
    return async (ctx, next) => {
      await next()
    }
  }
  static SpinGameResponse () {
    return async ctx => {
      ctx.body = Response.Ok(new SpinPayload())
    }
  }
  static TreasureGameWare () {
    return async (ctx, next) => {
      await next()
    }
  }
  static TreasureGameResponse () {
    return async ctx => {
      ctx.body = Response.Ok(new GameState())
    }
  }
}
