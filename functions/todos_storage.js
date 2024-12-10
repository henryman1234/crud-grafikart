import {readFile, writeFile} from 'node:fs/promises'
import { NotFoundError } from './errors.js'
const path = 'storage/todos.json'

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

/**
 * 
 * @returns {Promise<Todo[]>}
 */
export async function findTodos() {
    const data = await readFile(path, 'utf8')
    return JSON.parse(data)
}

/**
 * @param {string} title
 * @param {boolean} completed
 * @returns {promise<Todo>}
 */
export async function createTodo ({title, completed = false}) {
    const todo = {title, completed, id:Date.now()}
    const todos = [todo,...await findTodos()]
    await writeFile (path, JSON.stringify(todos, null, 2))
    return todo
}

/**
 * @param {number} id
 * @returns {Promise}
 */
export async function removeTodo(id) {
    const todos = await findTodos()
    const todo = todos.findIndex(function(todo){
        return todo.id === id
    })
    if (todo === -1) {
        throw new NotFoundError()
    }
    await writeFile(path, JSON.stringify(todos.filter(function(todo){
        return todo.id !== id
    }), null, 2))
}

/**
 * @param {number} id
 * @param {string} title
 * @param {boolean} completed
 * @returns {Promise<Todo>}
 */
export async function updateTodo(id, {title,completed = false}) {
    const todos = await findTodos()
    const todo = todos.find(function(todo){
        return todo.id === id
    })
    if (todo === undefined) {
        throw new NotFoundError()
    }
    todo.title = title
    todo.completed = completed
    await writeFile (path, JSON.stringify(todos, null, 2))
    return todo

}

