import { axios } from "./client.api";

function getStudents(params) {
	return axios.get("/students", {params});
}

function addStudent(studentData) {
	return axios.post("/students", studentData);
}

function removeStudent(id) {
	return axios.delete(`/students/${id}`);
}

function getStudentById(id) {
	return axios.get(`/students/${id}`);
}

function setStudent(data) {
	return axios.patch(`/students/${data.id}`, data)
}

export { getStudents, addStudent, removeStudent, getStudentById, setStudent};
