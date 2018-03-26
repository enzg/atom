import { JSONString } from '../json'

export class Response {
  constructor (payload = {}, code = 0) {
    this.payload = payload
    this.code = code
  }
  static Ok (payload) {
    return new Response(payload)
  }
  static Err (err, code = 500) {
    // careful!! because we need to response json even when error occurred.
    // so the ctx.status should ALWAYS be 200
    return new Response({ err: JSONString(err.stack) }, err.errorCode || code)
  }
}
