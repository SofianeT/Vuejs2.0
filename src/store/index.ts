import Vue from 'vue'
import Vuex from 'vuex'
import { Todo } from "@/entities/Todo";
import TodoService from "@/services/Todo.service";

Vue.use(Vuex)



interface ResponseService {
  data: [],
  count: number
}

interface toggleTodoObject {
  todo: Todo,
  completed: boolean
}

export default {
  namespaced: true,
  state: {
    allTodo: {
      data: [],
      count: 0
    },
    countTodo: 0
  },
  getters: {
    allTodo: (state: any) => state.allTodo,
  },
  mutations: {
  },
  actions: {

    async getAllTodo({commit}: any) {

      const todoService = new TodoService();
      const data = await todoService.getTodo();
        commit('setAllTodo', data);
    },
    async updateTodo(context: any, payload: toggleTodoObject ) {
      const todo = {
        id: payload.todo.id,
        title: payload.todo.title,
        completed: payload.completed ? !payload.todo.completed : payload.todo.completed,
        createdAt: payload.todo.createdAt,
        modifiedAt: new Date()
      }
      const todoService = new TodoService();
      const response = await todoService.updateTodo(todo)

        if (response === true) {
          context.dispatch('getAllTodo');
        }
      }
    },
    async deteleTodo(context: any, todo: Todo) {
      const todoService = new TodoService();
      const response = await todoService.deleteTodo(todo.id)
      if (response === true) {
        context.dispatch('getAllTodo');
        }
      },
}
