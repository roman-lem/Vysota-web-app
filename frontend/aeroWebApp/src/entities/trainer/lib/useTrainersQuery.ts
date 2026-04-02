import { useQuery } from "@tanstack/vue-query";
import { getTrainers } from "../api/trainer.api";



export function useTrainersQuery(filters: any, pagination: any){
    return useQuery({queryKey: ["trainers", filters, pagination], queryFn: () => getTrainers({...filters.value, ...pagination})})
}