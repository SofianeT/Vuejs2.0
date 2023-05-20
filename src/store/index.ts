import { Todo } from "@/entities/Todo";
import TodoService from "@/services/Todo.service";

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
    SET_ALL(state: any, data: ResponseService) {
      state.allTodo = data;
    },
    SET_COUNT_TODO(state: any, count: number) {
      state.countTodo = count
    },
    SET_COMPLETED(state: any, payload: Todo) {
      const index = state.allTodo.data.findIndex((obj: Todo) => obj.id === payload.id)

      if (index !== -1) {
        state.allTodo.data[index] = payload
        state.allTodo.count = state.allTodo.data.filter((todo: Todo) => !todo.completed).length
      }
    }
  },
  actions: {
    async getAllTodo({commit}: any) {

      const todoService = new TodoService();
      const data = await todoService.getTodo();

      if (data !== false) {
        commit('SET_ALL', data);
        commit('SET_COUNT_TODO', data.count)
      }
    },
    async updateTodo(context: any, payload: toggleTodoObject ) {
      const todo = {
        id: payload.todo.id,
        title: payload.todo.title,
        completed: payload.completed ? !payload.todo.completed : payload.todo.completed,
        createdAt: payload.todo.createdAt,
      }

      const todoService = new TodoService();
      const response = await todoService.updateTodo(todo)
      if (response === true) {
        context.commit('SET_COMPLETED', todo, {root: false})
        context.commit('SET_SNACKBAR_VALUE', {
          text: `${todo.title} mis à jour !`,
          concern: "info"
        }, {root: true})
      } else {
        context.commit('SET_SNACKBAR_VALUE', {
          text: `${todo.title} non mis à jour !`,
          concern: "error"
        }, {root: true})
      }
    },
    async deteleTodo(context: any, todo: Todo) {
      const todoService = new TodoService();
      const response = await todoService.deleteTodo(todo.id)
      if (response === true) {
        context.dispatch('getAllTodo');
        context.commit('SET_SNACKBAR_VALUE', {
          text: `${todo.title} supprimée !`,
          concern: "info"
        }, {root: true})
      } else {
        context.commit('SET_SNACKBAR_VALUE', {
          text: `${todo.title} non supprimée !`,
          concern: "error"
        }, {root: true})
      }
    }
  },
}
