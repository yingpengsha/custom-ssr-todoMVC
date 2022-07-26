import { renderToString } from 'react-dom/server'
import Template from './Template'
import { ModuleType } from './ComponentLoader'

export default async function genServerSideApp (component: React.FC, data: unknown) {
  return `<!DOCTYPE html>${renderToString(<Template></Template>)}`
}
