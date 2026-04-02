import { type Ref, shallowRef } from "vue";

interface Form<T> {
    data: Ref<T>
    reset: Function
}

export function useForm<T>(fields: T): Form<T>{
    const form = shallowRef<T>(fields)

    function reset() {
        Object.keys(form.value).forEach(k => form.value[k] = '')
    }

    return { data: form, reset: reset }

}
