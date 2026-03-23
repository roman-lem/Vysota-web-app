import { axios } from "./client.api";

function getUsers(params) {
	return axios.get("/users", params);
}

function removeUser(id) {
	return axios.delete(`/admin/users/${id}`);
}

export { getUsers, removeUser };
