import { reactive } from "vue";


export function useForm(fields = {}){
    const form = reactive({...fields})

    function reset() {
        Object.keys(form).forEach(k => form[k] = '')
    }

    return { form, reset }

}