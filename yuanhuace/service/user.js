import { Response } from '../../core/net/io'
import { Resource } from '../../core/model/atom'
import { User } from '../model/user'
import { JWT } from '../../core/auth'
export class UserService extends Resource {
  static Token () {
    return async ctx => {
      const resultSet = await User.Auth$({
        username: ctx.request.body.username,
        password: ctx.request.body.password
      })
      if (resultSet[0]) {
        ctx.body = Response.Ok({ token: JWT.sign(resultSet[0]) })
      } else {
        ctx.body = Response.Err(new Error('User pass wrong or User not found'))
      }
    }
  }
  static Edit () {
    return async ctx => {
      const gid = ctx.state.user.gid || ctx.params.id
      ctx.body = Response.Ok({
        message: `edit User id:${gid} success`
      })
    }
  }
  static Revoke () {
    return async ctx => {
      ctx.body = Response.Ok({
        message: `User:id=${ctx.params.id} token revoke`
      })
    }
  }
}
