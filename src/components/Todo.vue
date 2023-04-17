<template>
    <div class="flex">
        <span>{{ name }}</span>
        <span>{{ responsables.find(res => res.id == responsableId).name }}</span>
        <span>{{ nbHours }}</span>
        <div @click="todoStore.toggleSelect(name)">
            <input class="pointer-events-none" type="checkbox" :checked="isSelected">
        </div>
    </div>
    <!-- <button @click="todoStore.deleteTodo(name)">Delete</button> -->
    

</template>

<script setup>

import {useTodosStore} from '../stores/todos'

const todoStore = useTodosStore()

const props = defineProps({
    name:{
        required:true,
        type:String
    },
    responsableId:{
        required:true,
        type:Number
    },
    nbHours:{
        required:true,
        type:Number
    },
    isSelected:{
        required:true,
        type:Boolean
    }
})

const responsables = [
  {id: 1, name: 'Soren Desrondiers'},
  {id: 2, name: 'Charlotte Leriche'},
  {id: 3, name: 'Noam Belanger'},
]

</script>