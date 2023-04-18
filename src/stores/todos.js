import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

export const useTodoStore = defineStore('todos', () => {
    
    const todoForm = reactive({
        todoName:'',
        nbHours:'',
        selectedResponsable:''
    })
    
    const todos = ref([])

   
    const addTodo = () => {
        if(todos.value.find(todo=>todo.name==todoForm.todoName)){
            toaster.error("Un todo avec ce nom existe déjà.")
            return
        }
        todos.value.push({name:todoForm.todoName, nbHours:Number(todoForm.nbHours), responsableId : todoForm.selectedResponsable, isSelected:false})
        console.log(todos)
        resetInputs()
    }

    const toggleSelect=(name)=>{
        const isSelected = todos.value.find(todo => todo.name == name).isSelected
        todos.value.find(todo => todo.name == name).isSelected = !isSelected
    }

    const editTodo = (name, form) =>{
        let currentTodo = todos.value.find(todo => todo.name == name)
        if(currentTodo){
            currentTodo.name = form.name
            currentTodo.nbHours = Number(form.nbHours)
            currentTodo.responsableId = form.responsableId
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
        todoForm.todoName = ''
        todoForm.nbHours = ''
        todoForm.selectedResponsable = ''
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
