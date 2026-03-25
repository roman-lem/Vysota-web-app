import { defineStore } from "pinia";
import { ref} from "vue";
import { type Trainer } from "./trainer.types";

export const useTrainerStore = defineStore("trainer", () => {
    const trainer = ref<Trainer | null>(null)
	const trainers = ref<Trainer[]>([])

	return { trainer, trainers };
});
