import { FC } from "react";
import { Button } from "reactstrap";
import { useStore } from "../../data/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

interface NrcButtonProps {
	active: boolean;
	nrc: string;
	curse: string;
	available: number;
}

const NrcButton: FC<NrcButtonProps> = ({ active, nrc, available, curse }) => {
	const schedules = useStore(state => state.schedules);
	const setIndex = useStore(state => state.setIndex);
	const lockNRC = useStore(state => state.lockNRC);
	const setLockNRC = useStore(state => state.setLockNRC);

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
				if (active) {
					lockNRC[curse] ? setLockNRC(curse, null) : setLockNRC(curse, nrc);
					return;
				}
				const newIndex = schedules.findIndex(sch =>
					sch.nrcs.some(schNrc => schNrc.nrc === nrc)
				);
				if (newIndex === -1) return;
				setIndex(newIndex);
			}}
		>
			{nrc} {lockNRC[curse] === nrc ? <FontAwesomeIcon icon={faLock} /> : null}
		</Button>
	);
};

export default NrcButton;
