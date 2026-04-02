import { useMutation, useQuery } from "@tanstack/vue-query";
import { getStudentById, setStudent } from "../api/student.api";
import type { Student, StudentDto } from "../model/student.types";




export function useStudentQuery(id: number) {
    return useQuery({queryKey: ["student"], queryFn: () => getStudentById(id)})
}

export function useEditStudent(){
    return useMutation({mutationFn: (student: StudentDto) => setStudent(student)})
}