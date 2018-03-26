/**
 * Used as a global tool
 */
export class MixIn {
  static get SCATTER_MODE () { return 'free' }
  static get BASE_MODE () { return 'base' }
  static get TREASURE_MODE () { return 'treasure' }
  static get BONUS_MODE () { return 'bonus' }

  static Gid (gameId = 'NULL!', gameUserId = 'NULL!') {
    return `${gameId}:${gameUserId}`
  }
  static Mode () {
    return MixIn.BASE_MODE
  }
}
