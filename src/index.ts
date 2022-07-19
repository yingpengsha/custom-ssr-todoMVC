import createApp from 'core'
import TodoView from 'views'

createApp([
  {
    path: '/',
    redirect: '/all'
  },
  {
    path: '/{all,active,completed}',
    component: TodoView
  }
])
