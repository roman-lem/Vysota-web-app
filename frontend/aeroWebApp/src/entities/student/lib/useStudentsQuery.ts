import { useMutation, useQuery } from "@tanstack/vue-query";
import { addStudent, getStudents } from "../api/student.api";
import type { StudentDto } from "../model/student.types";



export function useStudentsQuery(filters: any, pagination: any) {
    return useQuery({queryKey: ["students", filters, pagination], queryFn: () => getStudents({...filters.value, ...pagination})})
}

export function useCreateStudent(){
    return useMutation({mutationFn: (student: StudentDto) => addStudent(student)})
}