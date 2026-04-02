import { axios } from "@/shared/api/client.api";
import { type Trainer } from "../model/trainer.types";
import type { TrainerResponse, TrainersResponse } from "./trainer.api.types";
import { trainerMapper } from "../lib/mapper";

async function getTrainers(params: object): Promise<{ data: Trainer[], meta: {total: number}}> {
	const res: { data: TrainersResponse} = await axios.get("/admin/users", {params});
	return { data: res.data.data.map(trainerMapper) , meta: res.data.meta}
}

async function getTrainerById(id: number): Promise<Trainer> {
	const res: { data: TrainerResponse} = await axios.get(`/admin/users/${id}`)
	return trainerMapper(res.data.data)
}

export { getTrainers, getTrainerById };
