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

        const todos: Todo[] = [];

        if (!Array.isArray(data)) return false;


        const countTodo = todos.filter((item) => item.completed === false).length;

        return {
            data: todos,
            count: countTodo,
        };
    }

    async createATodo(todo: Todo): Promise<boolean> {


        const response = await this.#_todoPorts.createTodo(todo)

        if (response.statusText === "Created") return true

        return false
    }

    async updateTodo(todo: { createdAt: Date; modifiedAt: Date; id: string; completed: boolean; title: string }): Promise<boolean> {

        const response = await this.#_todoPorts.updateTodo(todo)

        if (response.statusText === "OK") return true
        return false
    }

    async deleteTodo(idTodo: string): Promise<boolean> {
        const response = await this.#_todoPorts.deleteTodo(idTodo);
        if (response.statusText === "OK") return true
        return false
    }

}
