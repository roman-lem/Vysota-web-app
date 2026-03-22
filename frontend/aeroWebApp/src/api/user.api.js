import { axios } from "./client.api";

function getUsers() {
	return axios.get("/users");
}

function removeUser(id) {
	return axios.delete(`/admin/users/${id}`);
}

export { getUsers, removeUser };
