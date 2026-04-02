import { useQuery } from "@tanstack/vue-query";
import { getTrainerById } from "../api/trainer.api";


export function useTrainerQuery(id: number){
    return useQuery({queryKey: ["trainer", id], queryFn: () => getTrainerById(id)})
}