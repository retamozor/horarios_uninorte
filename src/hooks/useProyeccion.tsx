import { useEffect } from "react";
import api from "../helpers/api";
import { useStore } from "../data/useStore";
// import data from "../data/proyeccion.json";

export interface Proyeccion {
	MATERIACURSO: string;
	NOMBRE: string;
	CREDITOS: number;
}

const useProyeccion = () => {
	const getHorun = useStore(state => state.getHorun);
	const proyeccion = useStore(state => state.proyeccion);
	const setProyeccion = useStore(state => state.setProyeccion);
	const setIsLoadingProyeccion = useStore(state => state.setIsLoadingProyeccion);

	useEffect(() => {
		const controller = new AbortController();
		const horun = getHorun();
		api
			.get<Proyeccion[]>(`/proyeccion/${horun.pidm}/${horun.periodo}`, {
				signal: controller.signal,
			})
			.then(res => setProyeccion(res.data))
			.catch(_ => setProyeccion([]))
			.finally(() => setIsLoadingProyeccion(false));
			// setTimeout(() => {
			// 	setProyeccion(data);
			// 	setIsLoadingProyeccion(false)
			// }, 5000)

		return () => {
			controller.abort();
			setIsLoadingProyeccion(true)
		};
	}, []);

	return proyeccion;
};

export default useProyeccion;
