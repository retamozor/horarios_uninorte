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

	useEffect(() => {
		const controller = new AbortController();
		const horun = getHorun();
		api
			.get<Proyeccion[]>(`/proyeccion/${horun.pidm}/${horun.periodo}`, {
				signal: controller.signal,
			})
			.then(res => setProyeccion(res.data))
			.catch(_ => setProyeccion([]));

		return () => {
			controller.abort();
		};
	}, []);

	return proyeccion;
};

export default useProyeccion;
