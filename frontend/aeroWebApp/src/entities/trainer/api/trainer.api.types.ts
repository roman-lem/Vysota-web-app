import { type Trainer } from "../model/trainer.types"

export interface TrainerResponse {
    message:string
    data: Trainer | Trainer[]
    meta: object
}