import { create } from "zustand";
import { Schedule } from "../hooks/useCalcAllschedules";
import { Curse } from "../hooks/useMapData";
import { Proyeccion } from "../hooks/useProyeccion";

interface FilterCurses {
	[key: string]: Filter[];
}

interface Filter {
	nrc: string;
	teacher: string;
	active: boolean;
}
interface State {
	max: number;
	index: number;
	schedules: Schedule[];
	curses: Curse[];
	filteredCurses: Curse[];
	proyeccion: Proyeccion[];
	selectedCurses: Proyeccion[];
	filter: FilterCurses;
	filterSchedule: Curse;
	setMax: (by: number) => void;
	increase: (by: number) => void;
	decrease: (by: number) => void;
	setIndex: (index: number) => void;
	setSchedules: (schedules: Schedule[]) => void;
	setCurses: (curses: Curse[]) => void;
	getHorun: () => HorUN;
	setProyeccion: (proyeccion: Proyeccion[]) => void;
	setSelectedCurses: (selectedCurses: Proyeccion[]) => void;
	setFilter: (curse: string, value: Filter[]) => void;
	setFilterSchedule: (filterSchedule: Curse) => void;
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

export const useStore = create<State>()((set, get) => ({
	max: 0,
	index: 0,
	schedules: [],
	curses: [],
	filteredCurses: [],
	proyeccion: [],
	selectedCurses: [],
	filter: {},
	filterSchedule: {
		curse: "",
		name: "",
		nrcs: [
			{
				available: 0,
				capacity: 0,
				curse: "",
				name: "",
				nrc: "",
				taken: 0,
				teacher: "",
				schedules: [],
			},
		],
	},
	setMax: by => {
		if (by < 0) {
			set({ max: 0 });
			return;
		}
		set({ max: by });
	},
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
	setCurses: curses => set({ curses, filteredCurses: curses, filter: {} }),
	getHorun: () =>
		JSON.parse(
			localStorage.getItem("horun") ??
				'{"token":"","pidm":"","usuario":"","nombre":"","codigo":"","periodo":"","desc_periodo":"","coordinador":""}'
		),
	setProyeccion: proyeccion => set({ proyeccion }),
	setSelectedCurses: selectedCurses => set({ selectedCurses }),
	setFilter: (curse, value) => {
		const filter = { ...get().filter, [curse]: value };
		const filteredCurses = get().curses.map(curse => {
			const filterNRC = filter[curse.curse];
			return {
				...curse,
				nrcs: curse.nrcs.filter(
					nrc => filterNRC?.find(f => f.nrc === nrc.nrc)?.active ?? true
				),
			};
		});
		set({ filter, filteredCurses });
	},
	setFilterSchedule: (filterSchedule) => set({filterSchedule})
}));
