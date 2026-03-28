import { computed, reactive, ref } from "vue";

export function usePagination() {
	const total = ref<number>(0);
	const pagination = reactive({
		page: 1,
		limit: 20,
	});
	const pageNum = computed(() => Math.ceil(total.value / pagination.limit));

	const pages = computed(() => {
		if (pageNum.value <= 5) {
			return [...Array(pageNum)].map((_, i) => i + 1);
		} else if (pagination.page === pageNum.value) {
			return [...Array(5)].map((_, i) => i + pagination.page - 4);
		} else if (pagination.page === pageNum.value - 1) {
			return [...Array(5)].map((_, i) => i + pagination.page - 3);
		} else if (pagination.page >= 3) {
			return [...Array(5)].map((_, i) => i + pagination.page - 2);
		} else if (pagination.page >= 2) {
			return [...Array(5)].map((_, i) => i + pagination.page - 1);
		} else {
			return [...Array(5)].map((_, i) => i + pagination.page);
		}
	});

	return {
		total,
		pages,
		pagination,
		pageNum,
	};
}
