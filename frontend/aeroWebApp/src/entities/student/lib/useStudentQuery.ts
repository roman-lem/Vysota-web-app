import { useQuery } from "@tanstack/vue-query";
import { getStudentById } from "../api/student.api";




export function useStudentQuery(id: number) {
    return useQuery({queryKey: ["student"], queryFn: () => getStudentById(id)})
}