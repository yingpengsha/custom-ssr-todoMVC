import { createElement } from 'react'
import ReactDOM from 'react-dom'
import GlobToRegExp from 'glob-to-regexp'
import ReactComponentLoader from 'core/renderer/ComponentLoader'

import Template from './Template'
import routes from '../../routes'

const PageData = document.getElementById('__page_data')
// @ts-ignore
window.__page_data = JSON.parse(PageData?.innerHTML)

async function init () {
  const route = routes.find(route => GlobToRegExp(route.path, { extended: true }).test(window.location.pathname))
  await route?.component()

  ReactDOM.render(<Template><div id="app">{createElement(ReactComponentLoader(route?.component))}</div></Template>, document.body)
}

init()
