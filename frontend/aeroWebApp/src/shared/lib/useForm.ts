import { type Ref, shallowRef, ref } from "vue";

interface Form<T> {
    data: any
    reset: Function
}

export function useForm<T>(fields: T): Form<T>{
    const form = ref<T>(fields)

    function reset() {
        Object.keys(form.value).forEach(k => form.value[k] = '')
    }

    return { data: form, reset: reset }

}
