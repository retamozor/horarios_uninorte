import axios from "axios";
import { useStore } from "../data/useStore";

const api = axios.create({
	baseURL: "https://mihorario.uninorte.edu.co/M1H0R4R10",
});

api.interceptors.request.use(
	config => {
		const token = JSON.parse(
			useStore.getState().getHorun().token
		).token;
    
		if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	error => Promise.reject(error)
);

export default api;
