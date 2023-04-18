import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

export const useTodoStore = defineStore('todos', () => {
    
    const todoForm = reactive({
        name:'',
        nbHours:'',
        responsableId:''
    })
    
    const todos = ref([])

   const generalVerificationForm = (form) =>{
    console.log(form)
    if(form.name && form.nbHours && form.responsableId){
        if(!isNaN(Number(form.nbHours))){
            const responsableTodos = todos.value.filter(todo => todo.responsableId == form.responsableId)
            if(responsableTodos.length<3){
                const responsableNbHours = responsableTodos.reduce((acc,todo)=>acc+todo.nbHours,Number(form.nbHours))
                if(responsableNbHours<=10){
                    
                }
                else{
                    throw new Error("Ce responsable aura plus de 10 heures de travail avec cette tâche.")
                }
            }
            else{
                throw new Error("Vous ne pouvez pas ajouter une tâche additionnelle à cette personne.")
            }
        }
        else{
            throw new Error("Veuillez saisir un nombre pour le nombre d'heures.")
        }
    }
    else{
        throw new Error("Veuillez saisir tout les champs.")
    }
    
   }

    const addTodo = () => {
        try{
            generalVerificationForm(todoForm)
            // Specific verification
            if(todos.value.find(todo=>todo.name==todoForm.name)){
                throw new Error("Un todo avec ce nom existe déjà.")
            }
            todos.value.push({name:todoForm.name, nbHours:Number(todoForm.nbHours), responsableId : todoForm.responsableId, isSelected:false})
            resetInputs()
        }
        catch(e){
            toaster.error(e.message)
        }
    }

    const toggleSelect=(name)=>{
        const isSelected = todos.value.find(todo => todo.name == name).isSelected
        todos.value.find(todo => todo.name == name).isSelected = !isSelected
    }

    const editTodo = (name, form) =>{
        try{
            generalVerificationForm(form)
            let currentTodo = todos.value.find(todo => todo.name == name)
            if(currentTodo){
                currentTodo.name = form.name
                currentTodo.nbHours = Number(form.nbHours)
                currentTodo.responsableId = form.responsableId
            }
            return 'edited'
        }
        catch(e){
            toaster.error(e.message)
        }
    }

    const removeSelected = () => {
        todos.value = todos.value.filter(todo=>todo.isSelected==false)
    }

    const deleteTodo=(name)=>{
        const index = todos.value.indexOf(todos.value.find(todo=>todo.name==name))
        todos.value.splice(index, 1)
    }

    const resetInputs = () => {
        todoForm.name = ''
        todoForm.nbHours = ''
        todoForm.responsableId = ''
    }

    return{
        todoForm,
        addTodo,
        deleteTodo,
        toggleSelect,
        editTodo,
        removeSelected,
        todos
    }

})
