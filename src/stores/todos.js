import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useTodosStore = defineStore('todos', () => {
    
    const todoForm = reactive({
        todoName:'',
        nbHours:'',
        selectedResponsable:''
    })
    
    const todos = ref([])

   
    const addTodo = () => {
        todos.value.push({name:todoForm.todoName, nbHours:Number(todoForm.nbHours), responsableId : todoForm.selectedResponsable, isSelected:false})
        console.log(todos)
        resetInputs()
    }

    const resetInputs = () => {
        todoForm.todoName = ''
        todoForm.nbHours = ''
        todoForm.selectedResponsable = ''
    }

    return{
        todoForm,
        addTodo,
        todos
    }

})
