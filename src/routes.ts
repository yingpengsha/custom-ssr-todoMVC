import { Route } from 'core'

export default [
  {
    path: '/',
    redirect: '/all'
  },
  {
    path: '/{all,active,completed}',
    component: () => import('./views')
  }
] as Route[]
