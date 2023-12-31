import { useEffect, useState } from "react";
import useMapData, { Curse, Nrc } from "./useMapData";
import { useStore } from "../data/useStore";
import { v4 as uuidv4 } from "uuid";

export interface Schedule {
	id: string;
	nrcs: Nrc[];
}

const useCalcAllshcedules = () => {
	useMapData();
	const [schedules, setSchedules] = useState<Schedule[]>([]);
	const data = useStore(state => state.curses);
	const setMax = useStore(state => state.setMax);

	const combine = (curses: Curse[]): Schedule[] => {
		const curse = curses.pop();
		if (curse === undefined) return [];
		if (curses.length === 0) {
			return curse.nrcs.map(nrc => ({ id: uuidv4(), nrcs: [nrc] }));
		}
		return curse.nrcs.flatMap(nrc => {
			const schedules = combine([...curses]);
			return schedules.map(schedule => ({
				id: schedule.id,
				nrcs: [...schedule.nrcs, nrc],
			}));
		});
	};

	const haveConflict = (schedule: Schedule) => {
		const nrcs = schedule.nrcs;
		for (let i = 0; i < nrcs.length - 1; i++) {
			for (let j = i + 1; j < nrcs.length; j++) {
				const conflict = nrcs[i].shcedules.some(sch1 => {
					return nrcs[j].shcedules.some(sch2 => {
						if (sch1.day !== sch2.day) return false;
						if (Number(sch1.start) >= Number(sch2.end)) return false;
						if (Number(sch1.end) <= Number(sch2.start)) return false;
						return true;
					});
				});
				if (conflict) return true;
			}
		}
		return false;
	};

	useEffect(() => {
		const newSchedules = combine([...data]).filter(sch => !haveConflict(sch));
		setMax(newSchedules.length - 1);
		setSchedules(newSchedules);
	}, [data]);
	return schedules;
};

export default useCalcAllshcedules;
