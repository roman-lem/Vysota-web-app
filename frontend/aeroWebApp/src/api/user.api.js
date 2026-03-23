import { axios } from "./client.api";

function getUsers(params) {
	return axios.get("/admin/users", {params});
}

function getUserById(id) {
	return axios.get(`/admin/users/${id}`)
}

export { getUsers, getUserById };
