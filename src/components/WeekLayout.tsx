import appStyle from "../assets/css/app.module.css";
import Cell, { Day, Hour } from "../containers/Cell";
import Schedule from "./Schedule";

const days: { day: Day; label: string }[] = [
	{ day: "M", label: "Lunes" },
	{ day: "T", label: "Martes" },
	{ day: "W", label: "Miércoles" },
	{ day: "R", label: "Jueves" },
	{ day: "F", label: "Viernes" },
	{ day: "S", label: "Sabado" },
];

const hours = Array.from({ length: 14 }, (_, k) => {
	const start = (k + 6).toString().padStart(2, "0") as Hour;
	const end = (k + 7).toString().padStart(2, "0") as Hour;
	return { label: `${start}:30-${end}:30`, start, end };
});

const WeekLayout = () => {
	return (
		<div className={[appStyle.weekLayout, appStyle.shadow].join(" ")}>
			{days.map(({ day, label }) => (
				<Cell key={day} day={day} start="week" end="week">
					{label}
				</Cell>
			))}
			{hours.map(({ start, end, label }) => (
				<Cell key={`${start}-${end}`} day="H" start={start} end={end}>
					{label}
				</Cell>
			))}
      <Schedule />
		</div>
	);
};

export default WeekLayout;
