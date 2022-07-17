export interface TodoItem {
  id: string
  name: string
  isDone: boolean
}

const data = {
  todoList: [
    {
      id: '1',
      name: 'Taste JavaScript',
      isDone: true
    },
    {
      id: '2',
      name: 'Buy a unicorn',
      isDone: false
    }
  ]
}

const write = async (todoList: TodoItem[]) => { data.todoList = todoList }
const read = async (): Promise<TodoItem[]> => data.todoList

export default class TodoModel {
  async getAll () {
    return read()
  }

  async getActive () {
    return (await read()).filter(item => !item.isDone)
  }

  async getCompleted () {
    return (await read()).filter(item => item.isDone)
  }

  async getLeftCount () {
    return (await this.getActive()).length
  }

  async add (name: string) {
    const content = (await read()).concat({
      id: Date.now() + '',
      name,
      isDone: false
    })
    write(content)
    return content
  }

  async remove (id: string) {
    const content = await read()
    const idx = content.findIndex(item => item.id === id)
    content.splice(idx, 1)
    write(content)
    return content[idx]
  }

  async rename (id: string, name: string) {
    const content = await read()
    const idx = content.findIndex(item => item.id === id)
    content[idx].name = name
    write(content)
    return content[idx]
  }

  async toggle (id: string) {
    const content = await read()
    const idx = content.findIndex(item => item.id === id)
    content[idx].isDone = !content[idx].isDone
    write(content)
    return content[idx]
  }

  async clear () {
    return write([])
  }
}
