import { type Reactive, type Ref, ref } from "vue";

interface Form<T> {
    data: Ref
    reset: Function
}

export function useForm<T>(fields: T): Form<T>{
    const form = ref<T>(fields)

    function reset() {
        Object.keys(form.value).forEach(k => form.value[k] = '')
    }

    return { data: form, reset: reset }

}
