import { useEffect } from "react";
import cursos from "../data/cursos.json";
import { Day, Hour } from "../containers/Cell";
import { useStore } from "../data/useStore";

export interface Curse {
	name: string;
	curse: string;
	nrcs: Nrc[];
}

export interface Nrc {
	nrc: string;
	name: string;
	curse: string;
	teacher: string;
	capacity: number;
	taken: number;
	available: number;
	shcedules: Schedule[];
}

interface Schedule {
	day: Day;
	start: Hour;
	end: Hour;
	classroom: string;
}

const useMapData = () => {
  const setCurses = useStore(state => state.setCurses)

	useEffect(() => {
		const curses = Object.values(cursos).map(value => {
			const nrcs = Object.values(value);

			return {
				name: nrcs[0].NOMBRE_ASIGNATURA,
				curse: nrcs[0].MATCURSO,
				nrcs: nrcs.map(nrc => {
					return {
						nrc: nrc.NRC,
						name: nrc.NOMBRE_ASIGNATURA,
						curse: nrc.MATCURSO,
						teacher: nrc.PROFESOR,
						capacity: nrc.CAPACIDAD,
						taken: nrc.OCUPADO,
						available: nrc.DISPONIBLES,
						shcedules: nrc.DIAS.split("/").map((day, i) => ({
							day: day as Day,
							start: nrc.HORAS.split("/")[i].split("_")[0].slice(0, 2) as Hour,
							end: nrc.HORAS.split("/")[i].split("_")[1].slice(0, 2) as Hour,
							classroom: nrc.SALON.split("/")[i],
						})),
					};
				}),
			};
		});
		setCurses(curses);
	}, []);

	return;
};

export default useMapData;
