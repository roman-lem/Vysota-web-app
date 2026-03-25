import Axios from "axios";
import { errorHandler } from "../notifications/providers/errorHandler";


const axios = Axios.create({
	baseURL: "http://localhost:5000",
	timeout: 0,
	headers: {
		"Content-Type": "application/json"
	}
});

axios.interceptors.request.use(
	function (config) {
		const token = localStorage.getItem("access_token");
		if (!config.url?.includes("refresh") && token) {
			config.headers.Authorization = "Bearer " + token;
		}
		return config;
	},
	function (error) {
		errorHandler(error)
		return Promise.reject(error);
	},
);

axios.interceptors.response.use(
	function onFulfilled(response) {
		return response;
	},
	async function onRejected(error) {
        if (!error.response) {
			errorHandler(error)
            return Promise.reject(error);
        }
		if (error.response.status !== 401) {
			errorHandler(error)
			return Promise.reject(error);
		} else if (error.config.url.includes("/refresh")) {
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");
			errorHandler(error)
			return Promise.reject(error);
		} else {
			return await axios
				.get("/refresh", {
					headers: {
						Authorization:
							"Bearer " + localStorage.getItem("refresh_token"),
					},
				})
				.then((response) => {
					localStorage.setItem(
						"access_token",
						response.data.data.access_token,
					);
					return axios(error.config);
				})
				.catch(() => {
					localStorage.removeItem("access_token");
					localStorage.removeItem("refresh_token");
					errorHandler(error)
					return Promise.reject(error);
				});
		}
	},
);

export { axios };
