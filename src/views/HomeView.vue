<template>
  <main class="bg-red-500 w-full min-h-screen px-32 py-8">
    <h1 class="text-2xl mb-8">Todo TP 1 Vue3</h1>

    <form @submit.prevent="todoStore.addTodo()">
      <input type="text" placeholder="Todo Name" v-model="todoStore.todoForm.todoName">
      <input type="text" placeholder="Nombre heures" v-model="todoStore.todoForm.nbHours">
      <select name="" id="" v-model="todoStore.todoForm.selectedResponsable">
        <option value="" disabled selected>Responsables</option>
        <option :value="responsable.id" v-for="responsable in responsableStore.responsables" :key="responsable.id">{{ responsable.name }}</option>
      </select>
      <button type="submit">Ajouter todo</button>
      
    </form>
    <button class="disabled:opacity-50 bg-white" :disabled="todoStore.todos.every(todo=>todo.isSelected==false)" @click="todoStore.removeSelected">Delete selected todos</button>

    <div>
      <Todo v-for="todo in todoStore.todos" :name="todo.name" :responsableId="todo.responsableId" :nbHours="todo.nbHours" :isSelected="todo.isSelected" :key="todo.id"/>
    </div>
  </main>
</template>

<script setup>
import Todo from '../components/Todo.vue'
import { useTodoStore } from '../stores/todos';
import { useResponsableStore } from '../stores/responsables'

const todoStore = useTodoStore()
const responsableStore = useResponsableStore()



</script>