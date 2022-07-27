import React, { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import Template from './Template'
import { RouteDataContext } from './useLoaderData'

export default async function genServerSideApp (component: React.FC, data: unknown) {
  return `<!DOCTYPE html>${renderToString(
    <RouteDataContext.Provider value={data}>
      <Template>
        <template id="__page_data" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
        <div id="app">
          {createElement(component)}
        </div>
      </Template>
    </RouteDataContext.Provider>
  )}`
}
