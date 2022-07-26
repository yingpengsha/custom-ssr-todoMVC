import createApp from 'core'

createApp([
  {
    path: '/',
    redirect: '/all'
  },
  {
    path: '/{all,active,completed}',
    component: () => import('./views')
  }
])
