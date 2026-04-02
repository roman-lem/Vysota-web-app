import type { Trainer, TrainerDto } from "../model/trainer.types";


export function trainerMapper(dto: TrainerDto): Trainer {
    return JSON.parse(JSON.stringify(dto))
}