import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import appStyle from "../../assets/css/app.module.css";
import Cell, { Day, Hour } from "../../containers/Cell";
import Schedule from "./Schedule";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FilterModal from "./FilterModal";
import { useState } from "react";

const days: { day: Day; label: string }[] = [
	{ day: "M", label: "Lunes" },
	{ day: "T", label: "Martes" },
	{ day: "W", label: "Miércoles" },
	{ day: "R", label: "Jueves" },
	{ day: "F", label: "Viernes" },
	{ day: "S", label: "Sabado" },
	{ day: "U", label: "Domingo" },
];

const hours = Array.from({ length: 14 }, (_, k) => {
	const start = (k + 6).toString().padStart(2, "0") as Hour;
	const end = (k + 7).toString().padStart(2, "0") as Hour;
	return { label: `${start}:30 - ${end}:30`, start, end };
});

const WeekLayout = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className={[appStyle.weekLayout, appStyle.shadow].join(" ")}>
			{days.map(({ day, label }) => (
				<Cell key={day} day={day} start="week" end="week" toolTip={label}>
					{label}
				</Cell>
			))}
			{hours.map(({ start, end, label }) => (
				<Cell
					key={`${start}-${end}`}
					day="H"
					start={start}
					end={end}
					toolTip={label}
				>
					{label}
				</Cell>
			))}
			<Cell className={appStyle["hide-on-print"]} day="H" start="week" end="week" toolTip="Filtro por hora y dia" onClick={()=> setIsOpen(true)}>
				<FontAwesomeIcon icon={faFilter} size="2x" />
			</Cell>
			<Schedule />
			<FilterModal
				isOpen={isOpen}
				toggle={() => setIsOpen(o => !o)}
				days={days}
				hours={hours}
			/>
		</div>
	);
};

export default WeekLayout;
