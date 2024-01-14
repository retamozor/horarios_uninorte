import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useMemo } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { useStore } from "../../data/useStore";
import appStyle from "../../assets/css/app.module.css"

interface CurseNavigatorProps {
	nrc: string;
}

const CurseNavigator: FC<CurseNavigatorProps> = ({ nrc }) => {
	const schedules = useStore(state => state.schedules);
	const index = useStore(state => state.index);
	const setIndex = useStore(state => state.setIndex);

	const availableSch = useMemo(() => {
		const filters = schedules[index]?.nrcs
			.map(n => ({ nrc: n.nrc, curse: n.curse }))
			.filter(n => n.nrc !== nrc);
		return schedules.filter(schedule => {
			return schedule.nrcs.every(n => {
				const filter = filters.find(filter => filter.curse === n.curse);
				if (filter === undefined) return true;
				return filter.nrc === n.nrc;
			});
		});
	}, [schedules, index]);

	const availableSchIndex = availableSch.map(avl =>
		schedules.findIndex(schedule => avl.id === schedule.id)
	);
	const currIdx = availableSch.findIndex(
		avl => avl.id === schedules[index]?.id
	);

	return (
		<>
			<span className={appStyle["hide-on-print"]} style={{fontSize: '1rem', lineHeight: '1rem'}}>
				{currIdx + 1} / {availableSch.length}
			</span>
			<ButtonGroup className={`mx-2 ${appStyle["hide-on-print"]}`} size="sm">
				<Button
					color="primary"
					onClick={() => {
						setIndex(availableSchIndex[currIdx - 1]);
					}}
					disabled={currIdx === 0}
				>
					<FontAwesomeIcon icon={faCaretLeft} />
				</Button>
				<Button
					color="primary"
					onClick={() => {
						setIndex(availableSchIndex[currIdx + 1]);
					}}
					disabled={currIdx + 1 === availableSch.length}
				>
					<FontAwesomeIcon icon={faCaretRight} />
				</Button>
			</ButtonGroup>
		</>
	);
};

export default CurseNavigator;
