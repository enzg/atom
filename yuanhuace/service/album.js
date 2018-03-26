import _ from 'lodash'
import { Response } from '../../core/net/io'
import { Resource } from '../../core/model/atom'
import { Album, Photo } from '../model/album'
export class AlbumService extends Resource {
  static Show () {
    return async ctx => {
      const album = await Album.Find$(ctx.params.id)
      const photos = await Photo.Query$([ctx.params.id])
      album.photos = photos
      ctx.body = Response.Ok({
        data: [album]
      })
    }
  }
  static List () {
    return async ctx => {
      const keyWords = ctx.query.q || 'NULL!'
      const albums = await Album.Query$(keyWords.split(','))
      ctx.body = Response.Ok({count: albums.length, data: albums, tags: keyWords.split(',')})
    }
  }
  static Add () {
    return async ctx => {
      const album = new Album()
      album.works = _.fill(new Array(5), new Photo())
      ctx.redirect('/albums')
    }
  }
  static Like () {
    return async ctx => {
      const album = new Album()
      album.likes = (ctx.request.body.like) ? album.likes + 1 : ((album.likes > 0) ? album.likes - 1 : 0)
      ctx.body = Response.Ok({
        data: [album]
      })
    }
  }
}
