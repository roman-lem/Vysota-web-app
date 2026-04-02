import { useMutation, useQuery } from "@tanstack/vue-query";
import { addStudent, getStudents } from "../api/student.api";
import type { NewStudent } from "../model/student.types";



export function useStudentsQuery(filters: any, pagination: any) {
    console.log(filters.value)
    return useQuery({queryKey: ["students", filters, pagination], queryFn: () => getStudents({...filters.value, ...pagination})})
}

export function useCreateStudent(){
    return useMutation({mutationFn: (student: NewStudent) => addStudent(student)})
}