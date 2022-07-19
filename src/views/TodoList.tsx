import h from 'vhtml'
import Todo, { TodoItem } from 'models'
import { ServerEvent } from 'core/EventRegistry'
import Form from 'core/Form'

const Toggle: ServerEvent = async (ctx) => {
  await Todo.toggle(ctx.request.body)
}

const Remove: ServerEvent = async (ctx) => {
  await Todo.remove(ctx.request.body)
}

const Rename: ServerEvent = async (ctx) => {
  await Todo.rename(ctx.request.body)
}

const TodoList = (props: {
  todoList: TodoItem[]
}) => {
  const { todoList } = props
  return <ul class="todo-list">
    {todoList.map((todo) =>
      <li class={todo.isDone ? 'completed' : ''} >
        <div class="view">
          <Form submit={Toggle} method="post">
            <input name="id" class="hidden" value={todo.id} />
            <input class="toggle" type="checkbox" onchange="this.form.submit()" checked={todo.isDone} />
            <label>{todo.name}</label>
          </Form>
          <Form submit={Remove} method="post">
            <input name="id" class="hidden" value={todo.id} />
            <button type={'submit' as const} class="destroy"></button>
          </Form>
        </div>
        <Form submit={Rename} method="post">
          <input type="hidden" name="id" value={todo.id} />
          <input name="name" class="edit" onblur="clearEditMode(event)" value={todo.name} />
        </Form>
      </li>
    )}
  </ul>
}

export default TodoList
