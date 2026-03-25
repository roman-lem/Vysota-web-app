import { useTrainerStore } from "@/entities/trainer/model/trainer.store";
import { ref } from "vue";
import { getTrainers, getTrainerById } from "@/entities/trainer/api/trainer.api";

export function useTrainers() {
	const store = useTrainerStore();
	const total = ref<number>(0)
	const page = ref<number>(0)
	const limit = ref<number>(0)
	interface Meta {
		page: number
		limit: number
		total: number
	}

	async function fetchTrainers(params: object) {
		const res = await getTrainers(params)
		store.trainers = res[0]
		const meta = res[1] as Meta
		total.value = meta.total
		page.value = meta.page
		limit.value = meta.limit
	}

	async function fetchTrainerById(id: number) {
		store.trainer = await getTrainerById(id);
	}


	return {
        fetchTrainers,
        fetchTrainerById,
		total
	};
}
