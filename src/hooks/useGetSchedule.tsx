import { useEffect, useState } from "react";
import { Day, Hour } from "../containers/Cell";
import useCalcAllschedules from "./useCalcAllschedules";
import { useStore } from "../data/useStore";
import { Nrc } from "./useMapData";

interface ScheduleCell {
	day: Day;
	start: Hour;
	end: Hour;
	nrc: string;
	label: JSX.Element;
}

const useGetSchedule = () => {
	const [schedule, setSchedule] = useState<ScheduleCell[]>([]);
	const schedules = useCalcAllschedules();
	const index = useStore(state => state.index);
	const setSchedules = useStore(state => state.setSchedules);
	const filterSchedule = useStore(state => state.filterSchedule);

	useEffect(() => {
		setSchedules(schedules)
		let nrcs: Nrc[];
		if (schedules.length === 0) {
			nrcs = filterSchedule.nrcs
		} else {
			nrcs = schedules[index].nrcs
		}
		const cells = nrcs.flatMap(nrc => {
			return nrc.schedules.map(sch => ({
				day: sch.day,
				start: sch.start,
				end: sch.end,
				nrc: nrc.name,
				label: sch.classroom !== "" ? (
					<>
						<p style={{ margin: 0 }}>
							<b>{nrc.name}</b>
						</p>
						<p style={{ margin: 0 }}>
							<b>nrc: </b>
							{nrc.nrc} <b>salón: </b>
							{sch.classroom}
						</p>
					</>
				) : <></>,
			}));
		});
		setSchedule(cells);
		return () => {
			setSchedule([])
		}
	}, [schedules, index]);

	return schedule;
};

export default useGetSchedule;
