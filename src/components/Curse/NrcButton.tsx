import { FC } from "react";
import { Button } from "reactstrap";
import { useStore } from "../../data/useStore";

interface NrcButtonProps {
	active: boolean;
	nrc: string;
	available: number;
}

const NrcButton: FC<NrcButtonProps> = ({ active, nrc, available }) => {
	const schedules = useStore(state => state.schedules);
	const setIndex = useStore(state => state.setIndex);

	return (
		<Button
			className="mx-1"
			size="sm"
			color={available === 0 ? "danger" : "primary"}
			active={active}
			style={{
				borderRadius: "50rem",
				display: "inline-block",
				padding: "0.1rem 0.5rem",
				border: "none",
			}}
			disabled={
				!schedules.some(sch => sch.nrcs.some(schNrc => schNrc.nrc === nrc))
			}
			onClick={() => {
				if (active) return;
				const newIndex = schedules.findIndex(sch =>
					sch.nrcs.some(schNrc => schNrc.nrc === nrc)
				);
				if (newIndex === -1) return;
				setIndex(newIndex);
			}}
		>
			{nrc}
		</Button>
	);
};

export default NrcButton;
