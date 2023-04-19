<template>
    <div class="flex flex-col border-2 border-black/50 max-w-[500px] px-8 py-4 rounded-md cursor-cell" @dblclick="toggleIsModified(true)" v-if="!isModified">
        <p><span class="italic">Nom de la todo : </span>{{ name }}</p>
        <p><span class="italic">Nombre d'heures estimé : </span>{{ nbHours }} heures</p>
        <p><span class="italic">Nom responsable : </span>{{ responsableStore.responsables.find(res => res.id == responsableId).name }} </p>
        <div class="flex justify-end">
            <div @click="todoStore.toggleSelect(name)" class="cursor-pointer">
                <input class="pointer-events-none" type="checkbox" :checked="isSelected">
            </div>
        </div>
    </div>

    <!-- Edition -->
    <div class="flex flex-col border-2 border-black/50 max-w-[800px] px-8 py-4 rounded-md" v-else>
        <form action="" @submit.prevent="submitEdition(name, form)">
            <div class="ml-8">
                <div class="flex gap-8 my-4">
                    <input type="text" class="border-2 border-black/50 rounded-md px-2 py-1" v-model="editionForm.name">
                    <input type="text" class="border-2 border-black/50 rounded-md px-2 py-1" v-model="editionForm.nbHours">
                    <select class="border-2 border-black/50 rounded-md px-2 py-1" v-model="editionForm.responsableId">
                        <option value="" disabled selected>Responsables</option>
                        <option :value="responsable.id" v-for="responsable in responsableStore.responsables" :key="responsable.id">{{ responsable.name }}</option>
                    </select>
                </div>
                <div class="flex gap-8 my-4">
                    <button type="submit" class="bg-black/80 text-white rounded-md px-4 py-2">Edit todo</button>
                    <button class="bg-black/50 text-white rounded-md px-4 py-2" @click="toggleIsModified(false)">cancel</button>
                </div>
            </div>
        </form>
        
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
    // AJOUTER VERIFICATION NOUVEAU NOM
    const edition = todoStore.editTodo(name, editionForm)
    if(edition=='edited'){
        toggleIsModified(!isModified)
    }
    
}


</script>