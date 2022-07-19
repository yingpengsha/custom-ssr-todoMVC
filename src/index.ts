import createApp from 'core'
import TodoView from 'views'

createApp([
  {
    path: '/',
    redirect: '/all'
  },
  {
    path: '/all',
    component: TodoView
  },
  {
    path: '/active',
    component: TodoView
  },
  {
    path: '/completed',
    component: TodoView
  }
])
