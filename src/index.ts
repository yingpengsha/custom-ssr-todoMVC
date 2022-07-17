import Koa from 'koa'
import path from 'path'
import render from 'koa-ejs'
import Router from 'koa-router'
import logger from 'koa-logger'
import bodyParser from 'koa-body'
import fileServe from 'koa-static'

import TodoModel from './model'

const Todo = new TodoModel()

const server = new Koa()
const router = new Router()

server.use(fileServe('.'))
server.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = 400
    ctx.err = err
    ctx.body = `ErrorHandler: ${err instanceof Error ? err.message : 'unknown Error'}`
  }
})

render(server, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'ejs',
  cache: false,
  debug: true
})

router.get('/', async (ctx) => {
  await ctx.render('main', { path: ctx.path, todoList: await Todo.getAll() })
})
router.get('/active', async (ctx) => {
  await ctx.render('main', { path: ctx.path, todoList: await Todo.getActive() })
})
router.get('/completed', async (ctx) => {
  await ctx.render('main', { path: ctx.path, todoList: await Todo.getCompleted() })
})

server
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000, '0.0.0.0', () =>
    console.log('listening on http://localhost:3000 ...')
  )
