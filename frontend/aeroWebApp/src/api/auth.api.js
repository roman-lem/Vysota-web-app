import { axios } from "./client.api";

function getMe() {
	return axios.get("/access");
}

function registration(userData) {
	return axios.post("/register", userData);
}

function checkAdminAccess() {
	return axios.get("/admin");
}

function authorize(credentials) {
	return axios.post("/auth", credentials);
}

export { getMe, registration, checkAdminAccess, authorize };
