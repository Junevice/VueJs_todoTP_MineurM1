import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

export const useResponsableStore = defineStore('responsables', () => {

  // Notes pour Romain : Je sais que c'est overkill de créer un store pour une constante, mais je n'ai pas envie de créer une constante pour chacun(e) de mes composants/pages où je l'utilise et techniquement si on poussait un peu les fonctionnalités on pourrait avoir besoin d'un store pour les responsables donc ce n'est overkill que pour ce moment du projet. 
  const responsables = [
    {id: 1, name: 'Soren Desrondiers'},
    {id: 2, name: 'Charlotte Leriche'},
    {id: 3, name: 'Noam Belanger'},
  ]

  return{
    responsables
  }

})