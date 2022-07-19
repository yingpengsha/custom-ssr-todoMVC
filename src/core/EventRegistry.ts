import Koa from 'koa'
import Router from 'koa-router'
import { randomUUID } from 'crypto'

export interface ServerEvent {
  (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>): void | Promise<void>
}

export class EventRegistry {
  events: Record<string, ServerEvent> = {}

  register (event: {method: string, service: ServerEvent}) {
    const reusableEvent = Object.entries(this.events).filter(([key, value]) => value === event.service && key.split(':')[0] === event.method)[0]
    if (reusableEvent) {
      return reusableEvent[0].split(':')[1]
    }
    const id = randomUUID()
    const key = `${event.method.toLowerCase()}:/${id}`
    this.events[key] = event.service
    return id
  }
}

export default new EventRegistry()
