<template>
    <div>
        <span>{{ name }}</span>
        <span>{{ responsables.find(res => res.id == responsableId).name }}</span>
        <span>{{ nbHours }}</span>
        <span>{{ isSelected }}</span>
    </div>
</template>

<script setup>

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