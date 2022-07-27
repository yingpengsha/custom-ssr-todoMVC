import Koa from 'koa'
import Router from 'koa-router'
import logger from 'koa-logger'
import bodyParser from 'koa-body'
import fileServe from 'koa-static'
import EventRegistry from './EventRegistry'
import GlobToRegExp from 'glob-to-regexp'
import routes from 'routes'
import { ModuleType } from './renderer/ComponentLoader'
import genServerSideApp from './renderer/ServerSideApp'

export type ContextType = Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>

export interface Route {
  path: string
  redirect?: string
  component?: () => Promise<ModuleType>
}

export interface Options {
  port: number
}

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

// ======================== page loader ========================
router.get('/(.*)', async (ctx, next) => {
  const { path } = ctx
  const route = routes.find(route => GlobToRegExp(route.path, { extended: true }).test(path))
  if (route?.redirect) {
    ctx.redirect(route.redirect)
  } else if (route?.component) {
    const componentModule = await route.component()
    const data = await componentModule.loader(ctx)
    console.log(data)
    ctx.body = await genServerSideApp(componentModule.default, data)
  }
  next()
})

// ======================== post loader ========================
router.post('/(.*)', async (ctx) => {
  const postService = EventRegistry.events[`post:${ctx.path}`]
  if (postService) {
    await postService(ctx)
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
