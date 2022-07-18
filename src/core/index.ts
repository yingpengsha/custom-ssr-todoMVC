import Koa from 'koa'
import Router from 'koa-router'
import logger from 'koa-logger'
import bodyParser from 'koa-body'
import fileServe from 'koa-static'
import Todo, { TodoModel } from '@/models'

export interface PageEntry {
  (props: {ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>} & { children?: any[] }): string | Promise<string>
}

export interface Route {
  path: string
  redirect?: string
  component?: PageEntry
}

export interface Options {
  port: number
}

export default function createApp (routes: Route[], options?: Options) {
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
    const route = routes.find(route => route.path === path)
    if (route?.redirect) {
      ctx.redirect(route.redirect)
    } else if (route?.component) {
      ctx.body = await route.component({ ctx })
    }
    next()
  })

  router.post('/:methodName', async (ctx) => {
    const methodName = ctx.params.methodName as keyof TodoModel
    if (Todo?.[methodName]) {
      await Todo[methodName](ctx.request.body)
      ctx.redirect('back')
    }
  })

  return server
    .use(logger())
    .use(fileServe('.'))
    .use(bodyParser({ multipart: true }))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(options?.port || 3000, '0.0.0.0', () =>
      console.log('listening on http://localhost:3000 ...')
    )
}
