import { computed, reactive, ref } from "vue";

export function usePagination() {
	const total = ref<number>(0);
	const pagination = reactive({
		page: 1,
		limit: 20,
	});

    const pages = computed(() => {
        return [...Array(Math.ceil(total.value / pagination.limit))].map((_, i) => i + 1)
    })

	return {
		total,
        pages,
		pagination,
	};
}
