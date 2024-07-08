import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Schedule } from "../hooks/useCalcAllschedules";
import { Curse } from "../hooks/useMapData";
import { Proyeccion } from "../hooks/useProyeccion";

export interface FilterCurses {
	[key: string]: Filter[];
}

export interface Filter {
	nrc: string;
	teacher: string;
	active: boolean;
}

export interface Group {
	name: string;
	curse: string;
	curses: Curse[];
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
	isLoadingCurses: boolean;
	isLoadingProyeccion: boolean;
	includeUnavailable: boolean;
	lockNRC: { [key: string]: string | null };
	groups: Group[];
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
	setIsLoadingCurses: (isLoadingCurses: boolean) => void;
	setIsLoadingProyeccion: (isLoadingProyeccion: boolean) => void;
	setIncludeUnavailable: (includeUnavailable: boolean) => void;
	setLockNRC: (curse: string, nrc: string | null) => void;
	setGroups: (groups: Group[]) => void;
	addGroup: (name: string) => void;
	setGroup: (curse: string, newValue: (old: Group) => Group) => void;
	deleteGroup: (curse: string) => void;
	addGroupToCurses: () => void;
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

export const useStore = create<State>()(
	persist(
		(set, get) => ({
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
			isLoadingCurses: true,
			isLoadingProyeccion: true,
			includeUnavailable: false,
			lockNRC: {},
			groups: [],
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
			setFilterSchedule: filterSchedule => set({ filterSchedule }),
			setIsLoadingCurses: isLoadingCurses => set({ isLoadingCurses }),
			setIsLoadingProyeccion: isLoadingProyeccion =>
				set({ isLoadingProyeccion }),
			setIncludeUnavailable: includeUnavailable => set({ includeUnavailable }),
			setLockNRC: (curse, nrc) =>
				set({ lockNRC: { ...get().lockNRC, [curse]: nrc } }),
			setGroups: groups => set({ groups }),
			addGroup(name) {
				const newGroup = {
					name,
					curse: `ELG${(Math.random() * 1000).toFixed(0).padStart(4, "0")}`,
					curses: [],
				};
				set(state => ({ groups: [...state.groups, newGroup] }));
			},
			setGroup(curse, newValue) {
				set(state => ({
					groups: state.groups.map(group => {
						if (curse === group.curse) {
							return newValue(group);
						}
						return group;
					}),
				}));
			},
			deleteGroup(curse) {
				set(state => ({
					groups: state.groups.filter(group => group.curse !== curse),
				}));
			},
			addGroupToCurses() {
				set(state => {
					const groupCurses = state.groups.flatMap(g => g.curses);
					const curses = state.curses.filter(
						curse => !groupCurses.some(c => c.curse === curse.curse)
					);

					const newGroups = state.groups.map((g): Curse => {
						const nrcs = g.curses.flatMap(curse => {
							curse = state.curses.find(c => curse.curse === c.curse) ?? curse;
							return curse.nrcs
						});
						return {
							name: g.name,
							curse: g.curse,
							nrcs,
						};
					});
					return {
						curses: [...curses, ...newGroups],
						filteredCurses: [...curses, ...newGroups],
					}
				})
			}
		}),
		{
			name: "horario-uninorte",
			storage: createJSONStorage(() => sessionStorage),
			partialize: state => ({
				selectedCurses: state.selectedCurses,
				lockNRC: state.lockNRC,
				filter: state.filter,
				filterSchedule: state.filterSchedule,
				groups: state.groups,
			}),
		}
	)
);
