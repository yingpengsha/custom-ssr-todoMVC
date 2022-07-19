import h from 'vhtml'
import Form from 'core/Form'
import { PageEntry } from 'core'
import { ServerEvent } from 'core/EventRegistry'
import Todo, { TodoModel, TodoItem } from 'models'

import Layout from './Layout'
import TodoList from './TodoList'

const Add: ServerEvent = async (ctx) => {
  await Todo.add(ctx.request.body)
}

const ClearCompleted: ServerEvent = async () => {
  await Todo.clear()
}

const TodoView: PageEntry = async ({ ctx }) => {
  const { path } = ctx

  const methodName = `get${path[1].toUpperCase() + path.slice(2)}` as keyof TodoModel
  const leftCount = await Todo.getLeftCount()
  const todoList: TodoItem[] = (Todo[methodName] && Todo[methodName].length === 0)
    // @ts-ignore
    ? await Todo[methodName]() as TodoItem[]
    : []

  return <Layout>
    <body>
      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
          <Form submit={Add} method="post">
            <input name="name" class="new-todo" placeholder="What needs to be done?" autofocus />
          </Form>
        </header>
        <section class="main">
          <input id="toggle-all" class="toggle-all" type="checkbox" />
          <label for="toggle-all">Mark all as complete</label>
          <TodoList todoList={todoList} />
        </section>
        <footer class="footer">
          <span class="todo-count"><strong>{leftCount.toString()}</strong> item left</span>
          <ul class="filters">
            <li>
              <a class={path === '/all' ? 'selected' : ''} href="/">All</a>
            </li>
            <li>
              <a class={path === '/active' ? 'selected' : ''} href="/active">Active</a>
            </li>
            <li>
              <a class={path === '/completed' ? 'selected' : ''} href="/completed">Completed</a>
            </li>
          </ul>
          <Form method="post" submit={ClearCompleted} class={leftCount === 0 ? 'hidden' : ''}>
            <button type={'submit' as const} class="clear-completed">Clear completed</button>
          </Form>
        </footer>
      </section>
      <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="http://github.com/yingpengsha">Pengsha Ying</a></p>
      </footer>
      <script src="/static/scripts/EditModeToggle.js"></script>
    </body>
  </Layout>
}

export default TodoView
