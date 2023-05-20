import { Todo } from "./../entities/Todo";
import TodoPorts from "@/ports/Todo.ports";

export default class TodoService {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    #_todoPorts: TodoPorts;

    constructor() {
        this.#_todoPorts = new TodoPorts();
    }

    async getTodo() {
        const response = await this.#_todoPorts.getAllTodo();
        const data = response.data;

        let todos: Todo[] = [];

        if (!Array.isArray(data)) return false;

        todos = data.filter(this.checkDataIsTodo);

        const countTodo = todos.filter((item) => item.completed === false).length;

        return {
            data: todos,
            count: countTodo,
        };
    }

    async createATodo(todo: Todo): Promise<boolean> {
        const check = this.checkDataIsTodo(todo);

        if (!check) return false

        const response = await this.#_todoPorts.createTodo(todo)

        if (response.statusText === "Created") return true

        return false
    }

    async updateTodo(todo: Todo): Promise<boolean> {
        const check = this.checkDataIsTodo(todo);

        if (!check) return false

        const response = await this.#_todoPorts.updateTodo(todo)

        if (response.statusText === "OK") return true
        return false
    }

    async deleteTodo(idTodo: string): Promise<boolean> {
        const response = await this.#_todoPorts.deleteTodo(idTodo);
        if (response.statusText === "OK") return true
        return false
    }

checkDataIsTodo(data: any): data is Todo {
    if (
        typeof data.id !== "string" ||
        typeof data.title !== "string" ||
        typeof data.completed !== "boolean" ||
        typeof data.createdAt !== "string"
    )
        return false;
    return true;
}
}
