import Router from 'koa-router'
import { SyncService } from './service/sync'
import { PingService } from './service/ping'
import { AuthService } from './service/auth'
import { GameService } from './service/game'
const API = new Router({ prefix: '/games' })
/**
 * keep alive
 */
API.get('/:gameId/ping', PingService.PingResponse())

/**
 * user auth
 */
API.post('/:gameId/authuer',
  AuthService.TrialUserWare(),
  AuthService.AuthWare(),
  AuthService.AuthResponse()
)

/**
 * spin
 */
API.post('/:gameId/spin',
  AuthService.JWTWare(),
  GameService.SpinGameWare(),
  GameService.SpinGameResponse()
)

API.post('/:gameId/treasure',
  AuthService.JWTWare(),
  GameService.TreasureGameWare(),
  GameService.TreasureGameResponse()
)
/**
 * Sync service
 */
API.post('/:gameId/playersinfo',
  SyncService.SyncPlayerWare(),
  SyncService.SyncPlayerResponse()
)

API.post('/:gameId/admininfo',
  SyncService.SyncLordWare(),
  SyncService.SyncLordResponse()
)

export default API.routes()
