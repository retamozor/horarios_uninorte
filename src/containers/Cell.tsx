import React, { useMemo } from "react";
import appStyle from "../assets/css/app.module.css";

export type Hour =
	| "week"
	| "06"
	| "07"
	| "08"
	| "09"
	| "10"
	| "11"
	| "12"
	| "13"
	| "14"
	| "15"
	| "16"
	| "17"
	| "18"
	| "19"
	| "20";

export type Day = 'H' | 'M' | 'T' | 'W' | 'R' | 'F' | 'S'

interface CellProps {
	day: Day;
	start: Hour;
	end: Hour;
	color?: string;
}

const Cell: React.FC<React.PropsWithChildren<CellProps>> = ({
	day,
	start,
	end,
	color,
	children,
}) => {
	const hourStart = useMemo(() => {
		if (start === "week") return "start-week";
		return `h-${start}`;
	}, [start]);
	const hourEnd = useMemo(() => {
		if (end === "week") return "start-week";
		return `h-${end}`;
	}, [end]);

	return (
		<div
			className={[appStyle.cell, appStyle.shadow].join(' ')}
			style={{
				gridColumn: `${day}-start / ${day}-end`,
				gridRow: `${hourStart} / ${hourEnd}`,
				background: color,
			}}
		>
			{children}
		</div>
	);
};

export default Cell;
