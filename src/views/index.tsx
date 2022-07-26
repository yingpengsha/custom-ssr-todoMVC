import Form from 'core/Form'
import { ServerEvent } from 'core/EventRegistry'
import Todo, { TodoItem } from 'models'

import TodoList from './TodoList'
import { useLoaderData } from 'core/renderer/useLoaderData'
import { ContextType } from 'core'

const Actions: Record<string, ServerEvent> = {
  Add: async (ctx) => {
    await Todo.add(ctx.request.body)
  },
  ClearCompleted: async (ctx) => {
    await Todo.clear()
  }
}

const Loader = async (ctx: ContextType) => {
  const { path } = ctx

  // ======================== leftCount ========================
  const leftCount = await Todo.getLeftCount()

  // ======================== todoList ========================
  let todoList: TodoItem[] = []
  switch (path) {
    case '/all':
      todoList = await Todo.getAll()
      break
    case '/active':
      todoList = await Todo.getActive()
      break
    case '/completed':
      todoList = await Todo.getCompleted()
  }
  return {
    path,
    todoList,
    leftCount
  }
}

const TodoView: React.FC = () => {
  const { leftCount, path, todoList } = useLoaderData<typeof Loader>()
  return <>
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <Form submit={Actions.Add} method="post">
          <input name="name" className="new-todo" placeholder="What needs to be done?" autoFocus={true} />
        </Form>
      </header>
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList todoList={todoList} />
      </section>
      <footer className="footer">
        <span className="todo-count"><strong>{leftCount.toString()}</strong> item left</span>
        <ul className="filters">
          {['all', 'active', 'completed'].map(key =>
            <li>
              <a className={path === `/${key}` ? 'selected' : ''} href="/">{key[0].toUpperCase() + key.slice(1)}</a>
            </li>)}
        </ul>
        <Form method="post" submit={Actions.ClearCompleted} className={leftCount === 0 ? 'hidden' : ''}>
          <button type={'submit' as const} className="clear-completed">Clear completed</button>
        </Form>
      </footer>
    </section>
    <footer className="info">
      <p>Double-click to edit a todo</p>
      <p>Created by <a href="http://github.com/yingpengsha">Pengsha Ying</a></p>
    </footer>
  </>
}

export default TodoView
