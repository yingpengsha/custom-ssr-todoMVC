import Koa from 'koa'
import Router from 'koa-router'
import { randomUUID } from 'crypto'

export interface ServerEvent {
  method: 'get' | 'post'
  service: (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>) => void
}

export class EventRegistry {
  events: Record<string, ServerEvent> = {}

  register (event: ServerEvent) {
    const key = randomUUID()
    this.events[key] = event
  }
}

export default new EventRegistry()
