import  { createSharedComposable } from "@vueuse/core";

export default createSharedComposable(() =>{
    const  isOpen = ref(false)
    const toggleModalState =  (modalState : boolean) =>{
        isOpen.value = modalState
    }
    return {
        isOpen,
        toggleModalState
    }
        
})