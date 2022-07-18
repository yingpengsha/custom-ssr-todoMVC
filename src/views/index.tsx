import h from 'vhtml'
import { TodoItem } from '@/model'
import Layout from './Layout'
import TodoList from './TodoList'

const TodoView = (props: {
  path: string
  leftCount: number,
  todoList: TodoItem[]
}) => {
  const { path, leftCount, todoList } = props
  return <Layout>
    <body>
      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
          <form action="/add" method="post">
            <input name="name" class="new-todo" placeholder="What needs to be done?" autofocus />
          </form>
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
          <form action="/clear" method="post" class={leftCount === 0 ? 'hidden' : ''}>
            <button type={'submit' as const} class="clear-completed">Clear completed</button>
          </form>
        </footer>
      </section>
      <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="http://github.com/yingpengsha">Pengsha Ying</a></p>
      </footer>
      <script src="/src/scripts/EditModeToggle.js"></script>
    </body>
  </Layout>
}

export default TodoView
