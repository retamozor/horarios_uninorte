import React, { useMemo, useState } from "react";
import appStyle from "../assets/css/app.module.css";
import { Tooltip } from "reactstrap";

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

export type Day = "H" | "M" | "T" | "W" | "R" | "F" | "S" | "U";

interface CellProps {
	day: Day;
	start: Hour;
	end: Hour;
	toolTip: string,
	color?: string;
	onClick?: () => void;
	className?: string;
}

const Cell: React.FC<React.PropsWithChildren<CellProps>> = ({
	day,
	start,
	end,
	color,
	toolTip,
	children,
	onClick,
	className,
}) => {
	const hourStart = useMemo(() => {
		if (start === "week") return "start-week";
		return `h-${start}`;
	}, [start]);
	const hourEnd = useMemo(() => {
		if (end === "week") return "start-week";
		return `h-${end}`;
	}, [end]);

	const [tooltipOpen, setTooltipOpen] = useState(false);
	const toggle = () => setTooltipOpen(!tooltipOpen);

	return (
		<>
			<div
				className={[appStyle.cell, appStyle.shadow, className].join(" ")}
				id={`${day}-${start}-${end}`}
				style={{
					gridColumn: `${day}-start / ${day}-end`,
					gridRow: `${hourStart} / ${hourEnd}`,
					background: color,
				}}
				onClick={onClick}
			>
				{children}
			</div>
			<Tooltip
				isOpen={tooltipOpen}
				target={`${day}-${start}-${end}`}
				toggle={toggle}
				delay={{
					hide: 200,
					show: 1000
				}}
			>
				{toolTip}
			</Tooltip>
		</>
	);
};

export default Cell;
