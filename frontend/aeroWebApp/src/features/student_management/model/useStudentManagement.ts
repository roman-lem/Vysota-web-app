import { useStudentStore } from "@/entities/student/model/student.store";
import { ref } from "vue";
import { getStudents, getStudentById, setStudent, addStudent } from "@/entities/student/api/student.api";
import type { Student, NewStudent } from "@/entities/student/model/student.types";
import type { AxiosResponse } from "axios";


export function useStudents() {
	const store = useStudentStore();
	const total = ref<number>(0)
	const page = ref<number>(0)
	const limit = ref<number>(0)
	interface Meta {
		page: number
		limit: number
		total: number
	}

	async function fetchStudents(params: object) {
		const res = await getStudents(params)
		store.students = res[0]
		const meta = res[1] as Meta
		total.value = meta.total
		page.value = meta.page
		limit.value = meta.limit
	}

	async function fetchStudentById(id: number) {
		store.student = await getStudentById(id);
	}

	async function updateStudent(data: Student): Promise<AxiosResponse> {
		return await setStudent(data);
	}

	async function createStudent(data: NewStudent): Promise<AxiosResponse> {
		console.log(data)
		return await addStudent(data)
	}

	return {
		total,
		fetchStudents,
		fetchStudentById,
		updateStudent,
		createStudent
	};
}
