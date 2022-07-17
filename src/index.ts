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

router.redirect('/', '/all')
router.get('/:category', async (ctx) => {
  const { category } = ctx.params
  const methodName = `get${category[0].toUpperCase() + category.slice(1)}` as keyof TodoModel
  if (Todo?.[methodName]) {
    await ctx.render('main', {
      path: ctx.path,
      // @ts-ignore
      todoList: await Todo[methodName](),
      leftCount: await Todo.getLeftCount()
    })
  }
})

router.post('/:methodName', async (ctx) => {
  const methodName = ctx.params.methodName as keyof TodoModel
  if (Todo?.[methodName]) {
    await Todo[methodName](ctx.request.body)
    ctx.redirect('back')
  }
})

server
  .use(logger())
  .use(fileServe('.'))
  .use(bodyParser({ multipart: true }))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000, '0.0.0.0', () =>
    console.log('listening on http://localhost:3000 ...')
  )
