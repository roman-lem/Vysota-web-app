import { useQuery } from "@tanstack/vue-query";
import { getElements } from "../api/element.api";

export function useElementsQuery(filters:any, pagination:any){
    return useQuery({queryKey: ["elements", filters, pagination], queryFn: () => getElements({...filters.value, ...pagination})})
}