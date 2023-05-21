<template>
  <v-app>
    <div class="div-title mb-5">
      <h1 class="text-center text-uppercase">To do le loup</h1>
    </div>
    <!-- Modal pour l'ajout d'une tâche -->
    <v-dialog v-model="dialogAdd" persistent max-width="500">
      <template v-slot:activator="{ on, attrs }">
        <div class="d-flex justify-center mb-5">
          <v-btn
            class="d-flex justify-center"
            fab
            dark
            color="green"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </template>
      <div class="dialog-add d-flex flex-column justify-space-between">
        <div class="dialog-add-title mb-3">
          <h3 class="text-center text-uppercase">Ajouter</h3>
        </div>
        <div
          class="dialog-add-form d-flex flex-column justify-space-between mb-3"
        >
          <v-text-field
            variant="underlined"
            v-model="newTodo.title"
            label="Titre *"
            required
            class="mb-3"
            color="green"
          ></v-text-field>
          <v-textarea
            variant="underlined"
            v-model="newTodo.description"
            label="Description *"
            color="green"
            no-resize
            required
          ></v-textarea>
        </div>
        <div class="dialog-add-actions d-flex justify-space-around">
          <v-btn
            class="text-none text-uppercase"
            color="red"
            :rounded="false"
            variant="outlined"
            dark
            @click="dialogAdd = false"
          >
            Annuler
          </v-btn>
          <v-btn
            class="text-none text-uppercase"
            color="green"
            :rounded="false"
            variant="flat"
            dark
            @click="addTodo()"
          >
            Enregistrer
          </v-btn>
        </div>
      </div>
    </v-dialog>
    <!-- List des Todos présent dans le tableau todoList -->
    <div class="d-flex flex-wrap justify-space-around my-3">
      <TaskCard
        v-for="todo in getDisplayedItems()"
        :key="todo.id"
        :title="todo.title"
        :createdAt="todo.createdAt"
        :modifiedAt="todo.modifiedAt"
        :description="todo.description"
        :completed="todo.completed"
        :dialogEditTodo="() => openDialogEdit(todo.id)"
        :deleteTodo="() => deleteTodo(todo.id)"
        :changeCompleted="() => editCompleted(todo.id)"
      />
    </div>
    <!-- Pagination -->
    <v-pagination
      v-model="page"
      :length="totalPages"
      rounded="0"
      @input="getDisplayedItems()"
    ></v-pagination>
    <!-- Modal pour l'ajout d'une tâche -->
    <v-dialog v-model="dialogEdit" persistent max-width="500">
      <div class="dialog-edit d-flex flex-column justify-space-between">
        <div class="dialog-edit-title mb-3">
          <h3 class="text-center text-uppercase">Modifier</h3>
        </div>
        <div
          class="dialog-edit-form d-flex flex-column justify-space-between mb-3"
        >
          <v-text-field
            variant="underlined"
            v-model="editTodoData.title"
            label="Titre *"
            required
            class="mb-3"
            color="green"
          ></v-text-field>
          <v-textarea
            variant="underlined"
            v-model="editTodoData.description"
            label="Description *"
            color="green"
            no-resize
          ></v-textarea>
        </div>
        <div class="dialog-edit-actions d-flex justify-space-around">
          <v-btn
            class="text-none text-uppercase"
            color="red"
            :rounded="false"
            variant="outlined"
            dark
            @click="dialogEdit = false"
          >
            Annuler
          </v-btn>
          <v-btn
            class="text-none text-uppercase"
            color="blue"
            :rounded="false"
            variant="flat"
            dark
            @click="editTodo(editTodoData.id)"
          >
            Enregistrer
          </v-btn>
        </div>
      </div>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import TaskCard from "./components/task/TaskCard.vue";
import { Todo } from "./entities/Todo";

export default Vue.extend({
  name: "App",
  components: {
    TaskCard,
  },

  data: () => ({
    todoList: [] as Todo[],
    dialogAdd: false,
    dialogEdit: false,
    newTodo: {
      id: "",
      title: "",
      description: "",
      completed: false,
      createdAt: new Date(),
      modifiedAt: null,
    } as Todo,
    editTodoData: {
      id: "",
      title: "",
      description: "",
      completed: false,
      createdAt: new Date(),
      modifiedAt: null,
    } as Todo,
    page: 1,
    todosPerPage: 1
  }),

  methods: {
     addTodo() {
       if (
         this.newTodo.title.trim().length > 0 &&
         this.newTodo.description.trim().length > 0
       ) {
         const newId = this.todoList.length.toString();
         const newTodo = {
           id: newId,
           title: this.newTodo.title,
           description: this.newTodo.description,
           completed: false,
           createdAt: new Date(),
           modifiedAt: null,
         };

         this.todoList.push(newTodo);

         this.newTodo.title = "";
         this.newTodo.description = "";

         this.sortTodoList();

         this.dialogAdd = false;
       }
     },
    deleteTodo(id: string) {
      let index = this.todoList.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        this.todoList.splice(index, 1);
        this.sortTodoList();
      }
    },
    // Fonction pour ouvrir la modal pour modifier une todo
    openDialogEdit(id: string) {
      let index = this.todoList.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        this.editTodoData = Object.assign({}, this.todoList[index]);
        this.dialogEdit = true;
      }
    },

    // Fonction pour modifier une todo du tableau
    editTodo(id: string) {
      if (
        this.editTodoData.title.trim().length > 0 &&
        this.editTodoData.description.trim().length > 0
      ) {
        let todoUp = {
          ...this.editTodoData,
          modifiedAt: new Date(),
        } as Todo;
        let index = this.todoList.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          this.todoList.splice(index, 1, todoUp);
          this.editTodoData = {
            id: "",
            title: "",
            description: "",
            completed: false,
            createdAt: new Date(),
            modifiedAt: null,
          };
          todoUp = {
            id: "",
            title: "",
            description: "",
            completed: false,
            createdAt: new Date(),
            modifiedAt: null,
          };
          this.dialogEdit = false;
          console.log(this.todoList);
        }
      }
    },

    editCompleted(id: string) {
      let index = this.todoList.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        this.todoList[index].completed = !this.todoList[index].completed;
      }
    },

    sortTodoList() {
      this.todoList.sort((a, b) => {
        const timestampA = new Date(a.createdAt).getTime();
        const timestampB = new Date(b.createdAt).getTime();

        return timestampA - timestampB;
      });
    },

    getDisplayedItems() {
      const start = (this.page - 1) * this.todosPerPage;
      const end = start + this.todosPerPage;
      return this.todoList.slice(start, end);
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.todoList.length / this.todosPerPage);
    },
  }
});
</script>

<style>
.dialog-add {
  background-color: white;
  padding: 30px;
  border: solid 1px green;
  height: inherit;
}
.dialog-edit {
  background-color: white;
  padding: 30px;
  border: solid 1px blue;
  height: inherit;
}
</style>
