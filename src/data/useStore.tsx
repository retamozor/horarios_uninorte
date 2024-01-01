import { create } from "zustand";
import { Schedule } from "../hooks/useCalcAllshcedules";
import { Curse } from "../hooks/useMapData";
import { Proyeccion } from "../hooks/useProyeccion";

interface State {
	max: number;
	index: number;
	schedules: Schedule[];
	curses: Curse[];
	proyeccion: Proyeccion[];
	selectedCurses: Proyeccion[];
	setMax: (by: number) => void;
	increase: (by: number) => void;
	decrease: (by: number) => void;
	setIndex: (index: number) => void;
	setSchedules: (schedules: Schedule[]) => void;
	setCurses: (curses: Curse[]) => void;
	getHorun: () => HorUN;
	setProyeccion: (proyeccion: Proyeccion[]) => void;
	setSelectedCurses: (selectedCurses: Proyeccion[]) => void;
}

interface HorUN {
	token: string;
	pidm: string;
	usuario: string;
	nombre: string;
	codigo: string;
	periodo: string;
	desc_periodo: string;
	coordinador: string;
}

export const useStore = create<State>()(set => ({
	max: 0,
	index: 0,
	schedules: [],
	curses: [],
	proyeccion: [],
	selectedCurses: [],
	setMax: by => set({ max: by }),
	increase: by =>
		set(state => {
			if (state.index + by > state.max) return { index: state.index };
			return { index: state.index + by };
		}),
	decrease: by =>
		set(state => {
			if (state.index - by < 0) return { index: state.index };
			return { index: state.index - by };
		}),
	setIndex: index =>
		set(state => {
			if (index > state.max) return { index: state.max };
			if (index < 0) return { index: 0 };
			return { index };
		}),
	setSchedules: schedules => set({ schedules }),
	setCurses: curses => set({ curses }),
	getHorun: () =>
		JSON.parse(
			localStorage.getItem("horun") ??
				'{"token":"","pidm":"","usuario":"","nombre":"","codigo":"","periodo":"","desc_periodo":"","coordinador":""}'
		),
	setProyeccion: proyeccion => set({ proyeccion }),
	setSelectedCurses: selectedCurses => set({ selectedCurses }),
}));
