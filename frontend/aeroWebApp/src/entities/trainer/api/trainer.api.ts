import { axios } from "@/shared/api/client.api";
import { type Trainer } from "../model/trainer.types";
import { type TrainerResponse } from "./trainer.api.types";

async function getTrainers(params: object): Promise<[Trainer[], object]> {
	const res: { data: TrainerResponse} = await axios.get("/admin/users", {params});
	return [res.data.data as Trainer[], res.data.meta]
}

async function getTrainerById(id: number): Promise<Trainer> {
	const res: { data: TrainerResponse} = await axios.get(`/admin/users/${id}`)
	return res.data.data as Trainer
}

export { getTrainers, getTrainerById };
