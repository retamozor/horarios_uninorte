import { create } from "zustand";
import { Schedule } from "../hooks/useCalcAllshcedules";
import { Curse } from "../hooks/useMapData";

interface State {
	max: number;
	index: number;
	schedules: Schedule[];
	curses: Curse[];
	setMax: (by: number) => void;
	increase: (by: number) => void;
	decrease: (by: number) => void;
	setIndex: (index: number) => void;
	setSchedules: (schedules: Schedule[]) => void;
	setCurses: (curses: Curse[]) => void;
}

export const useStore = create<State>()((set) => ({
	max: 0,
	index: 0,
	schedules: [],
	curses: [],
	setMax: by => set({max: by}),
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
	setIndex: (index) => set(state => {
		if (index > state.max) return {index: state.max};
		if (index < 0) return {index: 0}
		return {index}
	}),
	setSchedules: (schedules) => set({schedules}),
	setCurses: (curses) => set({curses}),
}));
