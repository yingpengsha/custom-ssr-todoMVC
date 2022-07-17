import { readFile, writeFile } from 'jsonfile'
import path from 'path'

export interface TodoItem {
  id: string
  name: string
  isDone: boolean
}

const filePath = path.join(__dirname, './database.json')
const write = async (todoList: TodoItem[]) => writeFile(filePath, { todoList })
const read = async (): Promise<TodoItem[]> => {
  const fileContent = await readFile(filePath)
  return fileContent.todoList
}

export default class TodoModel {
  getAll () {
    return read()
  }

  async getActive () {
    return (await read()).filter(item => !item.isDone)
  }

  async getCompleted () {
    return (await read()).filter(item => item.isDone)
  }

  async add (item: TodoItem) {
    const content = (await read()).concat(item)
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
