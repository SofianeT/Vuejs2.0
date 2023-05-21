<template>
    <div
      :class="[
        completed ? 'task-completed' : 'task-uncompleted',
        'task-card',
        (isDateInLastFourDays(createdAt) && !completed) ? 'task-longtime' : '',
      ]"
    >
      <div class="d-flex justify-end mb-3">
        <v-icon color="red" @click="deleteTodo()">mdi-close</v-icon>
      </div>
      <div class="task-title mb-3">
        <h3 class="text-center">{{ title }}</h3>
      </div>
      <div class="task-date my-3">
        <div class="mb-2 text-center">
          <span>Créé le : {{ formatDate(createdAt) }}</span>
          <br />
          <span>À : {{ formatTime(createdAt) }}</span>
        </div>
        <div class="mb-2 text-center" v-if="modifiedAt !== null">
          <span>Modifié le : {{ formatDate(modifiedAt) }}</span>
          <br />
          <span>À : {{ formatTime(modifiedAt) }}</span>
        </div>
      </div>
      <div class="task-description my-3 text-center">
        <p>{{ description }}</p>
      </div>
      <div class="d-flex justify-space-between align-center mt-3">
        <v-icon color="blue" @click="dialogEditTodo()">mdi-pencil</v-icon>
        <v-icon
          :color="completed ? 'green' : 'red'"
          @click="changeCompleted()"
        >{{ completed ? 'mdi-check-bold' : 'mdi-minus-circle' }}</v-icon>
      </div>
    </div>
  </template>
  <script src="./index.js"></script>
  <style scoped src="./style.css"></style>
  