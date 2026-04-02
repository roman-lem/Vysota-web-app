import { axios } from "@/shared/api/client.api";
import type { Student, NewStudent } from "../model/student.types";
import type { AxiosResponse } from "axios";
import { studentMapper } from "../lib/mapper";


async function getStudents(params: object): Promise<{data: Student[], meta: {total: number}}> {
	const res: AxiosResponse = await axios.get("/students", {params});
	return {data: res.data.data.map(studentMapper), meta: res.data.meta}
}

async function addStudent(studentData: NewStudent): Promise<AxiosResponse> {
	return await axios.post("/students", studentData);
}

async function removeStudent(id: number): Promise<AxiosResponse> {
	return await axios.delete(`/students/${id}`);
}

async function getStudentById(id: number): Promise<Student> {
	const res: AxiosResponse = await axios.get(`/students/${id}`);
	return studentMapper(res.data.data)
}

async function setStudent(data: Student): Promise<AxiosResponse> {
	return await axios.patch(`/students/${data.id}`, data)
}

export { getStudents, addStudent, removeStudent, getStudentById, setStudent};
