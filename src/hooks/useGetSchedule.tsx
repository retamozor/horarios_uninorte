import { useEffect, useState } from "react";
import { Day, Hour } from "../containers/Cell";
import useCalcAllschedules from "./useCalcAllschedules";
import { useStore } from "../data/useStore";

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

	useEffect(() => {
		setSchedules(schedules)
		if (schedules.length === 0) return;
		const schedule = schedules[index];
		console.log(schedules)
		const cells = schedule.nrcs.flatMap(nrc => {
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
