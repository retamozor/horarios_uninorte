import Cell from "../../containers/Cell";
import useGetSchedule from "../../hooks/useGetSchedule";
import { randomLightColor } from "seed-to-color";

const Schedule = () => {
	const data = useGetSchedule();
	return (
		<>
			{data.map(cell => (
				<Cell
					key={`${cell.day}-${cell.start}-${cell.end}`}
					color={cell.nrc ? `#${randomLightColor(cell.nrc)}` : "#e36f6f"}
					day={cell.day}
					start={cell.start}
					end={cell.end}
					toolTip={`${cell.start}:30 - ${cell.end}:30`}
				>
					{cell.label}
				</Cell>
			))}
		</>
	);
};

export default Schedule;
