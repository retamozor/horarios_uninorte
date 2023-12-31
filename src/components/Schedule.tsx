import Cell from "../containers/Cell";
import useGetSchedule from "../hooks/useGetSchedule";
import { randomLightColor } from "seed-to-color";

const Schedule = () => {
	const data = useGetSchedule();
	return (
		<>
			{data.map(cell => (
				<Cell
					key={`${cell.day}-${cell.start}-${cell.end}`}
					color={`#${randomLightColor(cell.nrc)}`}
					day={cell.day}
					start={cell.start}
					end={cell.end}
				>
					{cell.label}
				</Cell>
			))}
		</>
	);
};

export default Schedule;
