import {ref} from "vue"

export function useClipboard(timeOut =1500){
    const copiedId = ref<number | null>()
     const isCopied = ref(false)


    const copy = async(text:string , id: number | null = null) =>{
      
            await navigator.clipboard.writeText(text);
            if (id !== null) {
                copiedId.value = id
                }
            isCopied.value = true
            setTimeout(() =>{
                copiedId.value = null
                 isCopied.value = false
            },timeOut)
      
    }

return {
    copiedId,
     copy,
     isCopied
}

}