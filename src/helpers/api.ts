import axios from "axios";

const api = axios.create({
	baseURL: "https://mihorario.uninorte.edu.co/M1H0R4R10",
});

api.interceptors.request.use(
	config => {
		const token = JSON.parse(
			localStorage.getItem("horun") ?? '{"token": ""}'
		).token;
    
		if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	error => Promise.reject(error)
);

export default api;
