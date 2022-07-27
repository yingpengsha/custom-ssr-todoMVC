import React from 'react'
import Todo, { TodoItem } from 'models'
import { ServerEvent } from 'core/EventRegistry'
import Form from 'core/Form'

const actions: Record<string, ServerEvent> = {
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
    {todoList?.map((todo) => <Item key={todo.id} todo={todo} />)}
  </ul>
}

const Item: React.FC<{todo: TodoItem}> = (props) => {
  const { todo } = props
  return <li className={todo.isDone ? 'completed' : ''} >
    <div className="view">
      <Form submit={actions.Toggle} method="post">
        <input name="id" className="hidden" defaultValue={todo.id} />
        <input className="toggle" type="checkbox" defaultChecked={todo.isDone} />
        <label>{todo.name}</label>
      </Form>
      <Form submit={actions.Remove} method="post">
        <input name="id" className="hidden" defaultValue={todo.id} />
        <button type={'submit'} className="destroy"></button>
      </Form>
    </div>
    <Form submit={actions.Rename} method="post">
      <input type="hidden" name="id" defaultValue={todo.id} />
      <input name="name" className="edit" defaultValue={todo.name} />
    </Form>
  </li>
}

export default TodoList
