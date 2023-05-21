import Vue from 'vue'
import Vuex from 'vuex'
import { Todo } from "@/entities/Todo";
import TodoService from "@/services/Todo.service";

Vue.use(Vuex)


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default new Vuex.Store({
    state: {
        todos: [] as Todo[],
        countTodo: 0,
    },
    mutations: {
          setTodos(state: { todos: any; countTodo: any; }, payload: { data: any; count: any; }) {
            state.todos = payload.data;
            state.countTodo = payload.count;
        },
        addTodo: (state: { todos: any[]; }, payload: any) => {
            state.todos.push(payload);
        }
    },
    actions: {
          async getTodos({ commit }: any, payload: { data: any; count: any;}) {
            const todoService = new TodoService();
            const response = await todoService.getTodo();
            commit("setTodos", response);
        },
        async addTodo ({ commit }: any, payload: Todo) {
            const todoService = new TodoService();
            const response = await todoService.createATodo(payload);
            if (response) {
                commit("addTodo", payload);
            }
        }
    },
    getters: {
            getTodos: (state: { todos: any; }) => {
            return state.todos;
        },
        getCountTodo: (state: { countTodo: any; }) => {
            return state.countTodo;
        }
    },
    modules: {
      }

} as any)
