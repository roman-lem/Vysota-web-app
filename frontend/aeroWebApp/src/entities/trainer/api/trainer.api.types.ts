import { type Trainer } from "../model/trainer.types"

export interface TrainerResponse {
    message:string
    data: Trainer
    meta: object
}

export interface TrainersResponse {
    message:string
    data: Trainer[]
    meta: {total: number}
}