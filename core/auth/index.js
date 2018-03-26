import jwt from 'koa-jwt'
import jsonwebtoken from 'jsonwebtoken'

export class JWT {
  static sign (data, secret = 'showmethemoney') {
    return jsonwebtoken.sign(data, secret)
  }
  static verifier (secret = 'showmethemoney') {
    return jwt({secret: secret})
  }
}
