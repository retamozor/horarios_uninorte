import { useEffect, useState } from "react";
import useMapData, { Curse, Nrc } from "./useMapData";
import { useStore } from "../data/useStore";
import { v4 as uuidv4 } from "uuid";

export interface Schedule {
	id: string;
	score: number;
	nrcs: Nrc[];
}

const useCalcAllschedules = () => {
	useMapData();
	const [schedules, setSchedules] = useState<Schedule[]>([]);
	const filteredCurses = useStore(state => state.filteredCurses);
	const setIndex = useStore(state => state.setIndex);
	const setMax = useStore(state => state.setMax);
	const filterSchedule = useStore(state => state.filterSchedule);
	const includeUnavailable = useStore(state => state.includeUnavailable);
	const lockNRC = useStore(state => state.lockNRC);

	const combine = (curses: Curse[]): Schedule[] => {
		const curse = curses.pop();
		if (curse === undefined) return [];
		if (curses.length === 0) {
			return curse.nrcs.map(nrc => ({ id: uuidv4(), score: 0, nrcs: [nrc] }));
		}
		return curse.nrcs.flatMap(nrc => {
			const schedules = combine([...curses]);
			return schedules.map(schedule => ({
				id: schedule.id,
				score: 0,
				nrcs: [...schedule.nrcs, nrc],
			}));
		});
	};

	const haveConflict = (schedule: Schedule) => {
		const nrcs = schedule.nrcs;
		for (let i = 0; i < nrcs.length - 1; i++) {
			for (let j = i + 1; j < nrcs.length; j++) {
				const conflict = nrcs[i].schedules.some(sch1 => {
					return nrcs[j].schedules.some(sch2 => {
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

	const calcScore = (schedule: Schedule) => {
		const days: {
			[key: string]: Nrc["schedules"];
		} = {
			M: [],
			T: [],
			W: [],
			R: [],
			F: [],
			S: [],
			U: [],
		};
		schedule.nrcs.forEach(nrc => {
			//penalizacion por no tener cupos
			schedule.score += nrc.available === 0 ? -35 : 0;
			nrc.schedules.forEach(sch => {
				days[sch.day].push(sch);
			});
		});

		Object.keys(days).forEach(key => {
			days[key] = days[key].sort((a, b) => Number(a.start) - Number(b.start));
			// puntaje por inicio y fin de clases
			schedule.score +=
				Number(days[key][0]?.start ?? "20") -
				1.5 * Number(days[key][days[key].length - 1]?.end ?? "06") +
				14;
			// puntaje por dia libre
			if (days[key].length === 0) {
				schedule.score += 10;
				return;
			}

			// juntar classes seguidas
			const newsch: Nrc["schedules"] = [];
			let curr = { ...days[key][0] };
			days[key].forEach((sch, i) => {
				if (i === 0) return;
				if (curr.end === sch.start) {
					curr.end = sch.end;
					return;
				}
				newsch.push(curr);
				curr = { ...sch };
			});
			newsch.push(curr);

			// puntaje por horas libres
			newsch.forEach((sch, i) => {
				schedule.score += 14 - Number(sch.end) + Number(sch.start);
				if (i === 0) return;
				schedule.score += 14 + Number(newsch[i - 1].end) - Number(sch.start);
			});
		});
	};

	useEffect(() => {
		const filteredSchedules = filteredCurses.filter(
			curse => curse.nrcs.length !== 0
		);
		const schedules = includeUnavailable
			? filteredSchedules.map(curse => ({
					...curse,
					nrcs: curse.nrcs.filter(nrc => {
						if (
							lockNRC[nrc.curse] !== null &&
							lockNRC[nrc.curse] !== undefined
						) {
							return lockNRC[nrc.curse] === nrc.nrc;
						}
						return true;
					}),
			  }))
			: filteredSchedules.map(curse => ({
					...curse,
					nrcs: curse.nrcs.filter(nrc => {
						if (
							lockNRC[curse.curse] !== null &&
							lockNRC[curse.curse] !== undefined
						) {
							return lockNRC[curse.curse] === nrc.nrc && nrc.available !== 0;
						}
						return nrc.available !== 0;
					}),
			  }));

		const newSchedules = combine([...schedules, filterSchedule]).filter(
			sch => !haveConflict(sch)
		);
		setMax(newSchedules.length - 1);
		setIndex(0);
		newSchedules.forEach(calcScore);
		setSchedules(newSchedules.sort((a, b) => b.score - a.score));
	}, [filteredCurses, filterSchedule, includeUnavailable, lockNRC]);
	return schedules;
};

export default useCalcAllschedules;
