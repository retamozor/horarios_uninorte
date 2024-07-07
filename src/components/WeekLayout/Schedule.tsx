import Cell from "../../containers/Cell";
import useGetSchedule from "../../hooks/useGetSchedule";
import appStyle from "../../assets/css/app.module.css";
import { randomLightColor } from "seed-to-color";
import { toast } from "react-toastify";
import { useStore } from "../../data/useStore";

const Schedule = () => {
	const data = useGetSchedule();
	const isLoadingCurses = useStore(state => state.isLoadingCurses);
	return (
		<>
			{!isLoadingCurses
				? data.map(cell => (
						<Cell
							className={cell.nrc ? undefined : appStyle["hide-on-print"]}
							key={`${cell.day}-${cell.start}-${cell.end}`}
							color={cell.nrc ? `#${randomLightColor(cell.name)}` : "#e36f6f"}
							day={cell.day}
							start={cell.start}
							end={cell.end}
							toolTip={`${cell.start}:30 - ${cell.end}:30`}
							onClick={() => {
								if (!cell.nrc) return;
								navigator.clipboard.writeText(cell.nrc);
								toast(`NRC: ${cell.nrc} copiado al portapapeles`, {
									type: "success",
								});
							}}
						>
							{cell.label}
						</Cell>
				  ))
				: null}
		</>
	);
};

export default Schedule;
