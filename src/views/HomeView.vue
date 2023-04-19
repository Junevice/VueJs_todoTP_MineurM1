<template>
  <main class="w-full min-h-screen px-64 py-16">
    <h1 class="text-2xl mb-8">Todolist TP 1 Vue3 <span class="text-xl">- Rémy Lecomte</span></h1>

    <div class="my-8">
      <h2 class="text-lg font-semibold mb-4">Informations todolist </h2>
      <div class="ml-8">
        <p>Nombre de todos total : <span v-text="todoStore.todos.length"></span></p>
        <p>Nombre de todos sélectionnées : <span v-text="todoStore.todos.filter((todo=>todo.isSelected==true)).length"></span></p>
      </div>
    </div>

    <form @submit.prevent="todoStore.addTodo()" class="my-8">
      <h2 class="text-lg font-semibold mb-4">Ajouter une todo</h2>
      <div class="ml-8">
        <div class="flex gap-8 my-4">
          <input type="text" class="border-2 border-black/50 rounded-md px-2 py-1" placeholder="Nom de la todo" v-model="todoStore.todoForm.name">
          <input type="text" class="border-2 border-black/50 rounded-md px-2 py-1" placeholder="Nombre d'heures" v-model="todoStore.todoForm.nbHours">
          <select class="border-2 border-black/50 rounded-md px-2 py-1" v-model="todoStore.todoForm.responsableId">
            <option value="" disabled selected>Responsables</option>
            <option :value="responsable.id" v-for="responsable in responsableStore.responsables" :key="responsable.id">{{ responsable.name }}</option>
          </select>
        </div>
      

        <div class="flex gap-8 my-4">
          <button type="submit" class="bg-black/80 text-white rounded-md px-4 py-2">Ajouter todo</button>
          <button class="bg-black/80 text-white rounded-md px-4 py-2 disabled:opacity-50 " :disabled="todoStore.todos.every(todo=>todo.isSelected==false)" @click="todoStore.removeSelected">Delete selected todos</button>
        </div>
      </div>
    </form>
    

    <div>
      <h2 class="text-lg font-semibold">Todos :</h2>
      <h3 class="italic mb-4">Double cliquez sur une todo pour l'éditer</h3>
      <div>
        <h4 class="font-semibold italic mb-2">Filtrer par responsable</h4>
        <div class="flex gap-8 mb-8">
          <select class="border-2 border-black/50 rounded-md px-2 py-1" v-model="todoStore.filterResonsableId">
            <option value="" disabled selected>Responsables</option>
            <option :value="responsable.id" v-for="responsable in responsableStore.responsables" :key="responsable.id">{{ responsable.name }}</option>
          </select>
          <button class="bg-black/80 text-white text-sm rounded-md px-4" v-if="todoStore.filterResonsableId" @click="todoStore.resetFilter">Reset filtre</button>
        </div>
      </div>
      
      <div class="flex flex-col gap-4" v-if="!todoStore.filterResonsableId">
        <Todo v-for="todo in todoStore.todos" :name="todo.name" :responsableId="todo.responsableId" :nbHours="todo.nbHours" :isSelected="todo.isSelected" :key="todo.id"/>
      </div>

      <!-- Filtered -->
      <div class="flex flex-col gap-4" v-else>
        <Todo v-for="todo in todoStore.todos.filter(todo=>todo.responsableId==todoStore.filterResonsableId)" :name="todo.name" :responsableId="todo.responsableId" :nbHours="todo.nbHours" :isSelected="todo.isSelected" :key="todo.id"/>
      </div>
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