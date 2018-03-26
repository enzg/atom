'use strict'
import Koa from 'koa'
import Routes from './routes'
import KoaBody from 'koa-body'
import { Runtime } from './midware'

const { PORT = 3000 } = process.env
const App = new Koa()

App
  .use(Runtime.ErrorWare())
  .use(KoaBody())
  .use(Runtime.LogWare())
  .use(Routes)
  .listen(PORT)
