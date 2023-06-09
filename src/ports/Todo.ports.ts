import { Todo } from "@/entities/Todo";
import axios from "axios";


export default class TodoPorts {


    url = "https://646332f37a9eead6fadfb61c.mockapi.io/";

    getAllTodo() {
        const endPoint = "Todo";

        return axios.get(`${this.url}/${endPoint}`);
    }

    createTodo(todo: Todo) {
        const endpoint = "Todo";
        return axios.post(`${this.url}/${endpoint}`, todo);
    }

    updateTodo(todo: { createdAt: Date; modifiedAt: Date; id: string; completed: boolean; title: string }) {
        const endpoint = "Todo";
        return axios.put(`${this.url}/${endpoint}/${todo.id}`, todo);
    }
    deleteTodo(idTodo: string) {
        const endpoint = "Todo";
        return axios.delete(`${this.url}/${endpoint}/${idTodo}`);
    }
}
