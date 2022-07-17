import Koa from 'koa'
import path from 'path'
import render from 'koa-ejs'
import Router from 'koa-router'
import logger from 'koa-logger'
import bodyParser from 'koa-body'
import fileServe from 'koa-static'

import TodoModel from './model'
import { assert } from 'console'

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
  layout: 'index',
  viewExt: 'ejs',
  cache: false,
  debug: true
})

router.get('/', async (ctx) => {
  await ctx.render('main', { path: ctx.path, todoList: await Todo.getAll(), leftCount: await Todo.getLeftCount() })
})
router.get('/active', async (ctx) => {
  await ctx.render('main', { path: ctx.path, todoList: await Todo.getActive(), leftCount: await Todo.getLeftCount() })
})
router.get('/completed', async (ctx) => {
  await ctx.render('main', { path: ctx.path, todoList: await Todo.getCompleted(), leftCount: await Todo.getLeftCount() })
})

router.post('/add', async (ctx) => {
  assert(ctx.request.body.name)
  await Todo.add(ctx.request.body.name)
  ctx.redirect('back')
})
router.post('/remove', async (ctx) => {
  assert(ctx.request.body.id)
  await Todo.remove(ctx.request.body.id)
  ctx.redirect('back')
})
router.post('/toggle', async (ctx) => {
  assert(ctx.request.body.id)
  await Todo.toggle(ctx.request.body.id)
  ctx.redirect('back')
})
router.post('/rename', async (ctx) => {
  assert(ctx.request.body.id && ctx.request.body.name)
  await Todo.rename(ctx.request.body.id, ctx.request.body.name)
  ctx.redirect('back')
})
router.post('/clear', async (ctx) => {
  await Todo.clear()
  ctx.redirect('back')
})

server
  .use(logger())
  .use(bodyParser({ multipart: true }))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000, '0.0.0.0', () =>
    console.log('listening on http://localhost:3000 ...')
  )

export default server
