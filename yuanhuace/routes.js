import Router from 'koa-router'
import { AlbumService } from './service/album'
import { DesignService } from './service/design'
import { UserService } from './service/user'
import { JWT } from '../core/auth'
import { TagService } from './service/tag'
import { CategoryService } from './service/category'
import { AggrateQueryServervice } from './service/aggrate'

const API = new Router()
API.get('/things', AggrateQueryServervice.List())
/**
 * Category
 */
API.get('/cates', CategoryService.List())
/**
 * Albums
 */
API.get('/albums', AlbumService.List())
API.get('/albums/:id', AlbumService.Show())
API.post('/albums', AlbumService.Add())
API.put('/albums/:id', AlbumService.Edit())
API.delete('/albums/:id', AlbumService.Delete())
API.post('/albums/:id/like', AlbumService.Like())
/**
 * Designs
 */
API.get('/designs', DesignService.List())
API.get('/designs/:id', DesignService.Show())
API.post('/designs', DesignService.Add())
API.put('/designs/:id', DesignService.Edit())
API.delete('/designs/:id', DesignService.Delete())
/**
 * Users
 */
API.put('/users/:id', JWT.verifier(), UserService.Edit())
API.post('/login', UserService.Token())
API.post('/logout', UserService.Revoke())

API.get('/tags', TagService.List())
export default API.routes()
