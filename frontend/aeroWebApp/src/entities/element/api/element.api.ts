import { axios } from "@/shared/api/client.api";
import type { Element } from "../model/element.types";
import type { ElementResponse } from "./element.api.types";
import { elementsMapper } from "../lib/mapper";

async function getElements(params: object): Promise<{data: Element[], meta:{total: number}}> {
	const res: { data: ElementResponse} = await axios.get("/elements", {params});
	return { data: elementsMapper(res.data.data), meta: res.data.meta as {total: number}}
}

export { getElements };
