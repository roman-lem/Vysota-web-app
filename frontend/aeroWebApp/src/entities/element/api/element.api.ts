import { axios } from "@/shared/api/client.api";
import type { Element } from "../model/element.types";
import type { ElementResponse } from "./element.api.types";

async function getElements(params: object): Promise<[Element[], {total: number}]> {
	const res: { data: ElementResponse} = await axios.get("/elements", {params});
	return [res.data.data as Element[], res.data.meta as {total: number}]
}

export { getElements };
