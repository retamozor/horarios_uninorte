import { useEffect, useState } from "react";
import api from "../helpers/api";
import { useStore } from "../data/useStore";
// import data from "../data/cursos.json";

interface Cursos {
	[key: string]: {
		[key: string]: {
			NRC: string;
			NOMBRE_ASIGNATURA: string;
			MATCURSO: string;
			PROFESOR: string;
			FECHAS: string;
			HORAS: string;
			DIAS: string;
			SALON: string;
			CAPACIDAD: number;
			OCUPADO: number;
			DISPONIBLES: number;
		};
	};
}

const useCursos = () => {
	const getHorun = useStore(state => state.getHorun);
	const selectedCurses = useStore(state => state.selectedCurses);
	const [cursos, setCursos] = useState<Cursos>({});

	useEffect(() => {
		const controller = new AbortController();
		const horun = getHorun();
		if (selectedCurses.length === 0) return;
		api
			.get(
				`/proyeccion/${horun.pidm}/cursos/${selectedCurses
					.map(curse => curse.MATERIACURSO)
					.join(",")}/${horun.periodo}`,
				{
					signal: controller.signal,
				}
			)
			.then(res => setCursos(res.data))
			.catch(_ => setCursos({}));

		return () => {
			controller.abort();
		};
	}, [selectedCurses]);

	return cursos;
};

export default useCursos;
