import Todo, { TodoItem } from 'models'
import { ServerEvent } from 'core/EventRegistry'
import Form from 'core/Form'

const Actions: Record<string, ServerEvent> = {
  Toggle: async (ctx) => {
    await Todo.toggle(ctx.request.body)
  },
  Remove: async (ctx) => {
    await Todo.remove(ctx.request.body)
  },
  Rename: async (ctx) => {
    await Todo.rename(ctx.request.body)
  }
}

const TodoList: React.FC<{todoList: TodoItem[]}> = (props) => {
  const { todoList } = props
  return <ul className="todo-list">
    {todoList.map((todo) =>
      <li className={todo.isDone ? 'completed' : ''} >
        <div className="view">
          <Form submit={Actions.Toggle} method="post">
            <input name="id" className="hidden" value={todo.id} />
            <input className="toggle" type="checkbox" onchange="this.form.submit()" checked={todo.isDone} />
            <label>{todo.name}</label>
          </Form>
          <Form submit={Actions.Remove} method="post">
            <input name="id" className="hidden" value={todo.id} />
            <button type={'submit' as const} className="destroy"></button>
          </Form>
        </div>
        <Form submit={Actions.Rename} method="post">
          <input type="hidden" name="id" value={todo.id} />
          <input name="name" className="edit" onblur="clearEditMode(event)" value={todo.name} />
        </Form>
      </li>
    )}
  </ul>
}

export default TodoList
