import h from 'vhtml'
import { TodoItem } from '@/models'

const TodoList = (props: {
  todoList: TodoItem[]
}) => {
  const { todoList } = props
  return <ul class="todo-list">
    {todoList.map((todo) =>
      <li class={todo.isDone ? 'completed' : ''} >
        <div class="view">
          <form action="/toggle" method="post">
            <input name="id" class="hidden" value={todo.id} />
            <input class="toggle" type="checkbox" onchange="this.form.submit()" checked={todo.isDone} />
            <label>{todo.name}</label>
          </form>
          <form action="/remove" method="post">
            <input name="id" class="hidden" value={todo.id} />
            <button type={'submit' as const} class="destroy"></button>
          </form>
        </div>
        <form action="/rename" method="post">
          <input type="hidden" name="id" value={todo.id} />
          <input name="name" class="edit" onblur="clearEditMode(event)" value={todo.name} />
        </form>
      </li>
    )}
  </ul>
}

export default TodoList
