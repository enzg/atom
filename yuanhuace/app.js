'use strict'
import Koa from 'koa'
import KoaBody from 'koa-body'
import Routes from './routes'
const { PORT = 4000 } = process.env
const App = new Koa()

App
  .use(KoaBody())
  .use(Routes)
  .listen(PORT)
