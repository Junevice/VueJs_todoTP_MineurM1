<template>
  <main class="bg-red-500 w-full min-h-screen px-32 py-8">
    <h1 class="text-2xl mb-8">Todo TP 1 Vue3</h1>

    <form @submit.prevent="todoStore.addTodo()">
      <input type="text" placeholder="Todo Name" v-model="todoStore.todoForm.todoName">
      <input type="text" placeholder="Nombre heures" v-model="todoStore.todoForm.nbHours">
      <select name="" id="" v-model="todoStore.todoForm.selectedResponsable">
        <option value="" disabled selected>Responsables</option>
        <option :value="responsable.id" v-for="responsable in responsables" :key="responsable.id">{{ responsable.name }}</option>
      </select>
      <button type="submit">Ajouter todo</button>
    </form>

    <div>
      <Todo v-for="todo in todoStore.todos" :name="todo.name" :responsableId="todo.responsableId" :nbHours="todo.nbHours" :isSelected="todo.isSelected" :key="todo.id"/>
    </div>
  </main>
</template>

<script setup>
import Todo from '../components/Todo.vue'
import {ref} from 'vue'
import { useTodosStore } from '../stores/todos';

const todoStore = useTodosStore()

const responsables = [
  {id: 1, name: 'Soren Desrondiers'},
  {id: 2, name: 'Charlotte Leriche'},
  {id: 3, name: 'Noam Belanger'},
]



</script>