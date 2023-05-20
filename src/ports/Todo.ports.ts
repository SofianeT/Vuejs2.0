import { Todo } from "@/entities/Todo";
import axios from "axios/index";


export default class TodoPorts {
   // #url = "https://6423efc847401740432f0134.mockapi.io/api/v1";

    getAllTodo() {
        const endPoint = "todo";

        return axios.get(`${this.#url}/${endPoint}`);
    }

    createTodo(todo: Todo) {
        const endpoint = "todo";
        return axios.post(`${this.#url}/${endpoint}`, todo);
    }

    updateTodo(todo: Todo) {
        const endpoint = "todo";
        return axios.put(`${this.#url}/${endpoint}/${todo.id}`, todo);
    }
    deleteTodo(idTodo: string) {
        const endpoint = "todo";
        return axios.delete(`${this.#url}/${endpoint}/${idTodo}`);
    }
}
