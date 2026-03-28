import { defineStore } from "pinia";
import { ref} from "vue";
import type { Element } from "./element.types";
import { getElements } from "../api/element.api";

export const useElementStore = defineStore("element", () => {
	const elements = ref<Element[]>([])

	async function loadElements(params: object){
		const res = await getElements(params)
		elements.value = res[0]
		return res[1]
	}

	return { elements, loadElements };
});
