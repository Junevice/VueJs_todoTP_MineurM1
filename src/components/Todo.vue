<template>
    <div class="flex" @dblclick="toggleIsModified(true)" v-if="!isModified">
        <span>{{ name }}</span>
        <span>{{ responsableStore.responsables.find(res => res.id == responsableId).name }}</span>
        <span>{{ nbHours }}</span>
        <div @click="todoStore.toggleSelect(name)">
            <input class="pointer-events-none" type="checkbox" :checked="isSelected">
        </div>
    </div>

    <!-- Edition -->
    <div class="flex gap-4" v-else>
        <form action="" @submit.prevent="submitEdition(name, form)">
            <input type="text" v-model="editionForm.name">
            <input type="text" v-model="editionForm.nbHours">
            <select name="" id="" v-model="editionForm.responsableId">
                <option value="" disabled selected>Responsables</option>
                <option :value="responsable.id" v-for="responsable in responsableStore.responsables" :key="responsable.id">{{ responsable.name }}</option>
            </select>
            <button type="submit">Edit todo</button>
            
        </form>
        <button @click="toggleIsModified(false)">cancel</button>
    </div>
    

</template>

<script setup>

import {useTodoStore} from '../stores/todos'
import {useResponsableStore} from '../stores/responsables'
import {ref, reactive, onMounted} from 'vue'

const todoStore = useTodoStore()
const responsableStore = useResponsableStore()

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

onMounted(()=>{
    resetEditionForm()
})

const editionForm = reactive({
    name:props.name,
    nbHours:props.nbHours,
    responsableId:props.responsableId,
})

const isModified = ref(false)

const resetEditionForm = () => {
    editionForm.name=props.name
    editionForm.nbHours=props.nbHours
    editionForm.responsableId=props.responsableId
}

const toggleIsModified = (bool) => {
    isModified.value=bool

    resetEditionForm()
}

const submitEdition = (name) =>{
    
    const edition = todoStore.editTodo(name, editionForm)
    if(edition=='edited'){
        toggleIsModified(!isModified)
    }
    
}


</script>