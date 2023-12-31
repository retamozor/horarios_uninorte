import appStyle from "../assets/css/app.module.css";
import { FC, useMemo } from "react";
import { Curse, Nrc } from "../hooks/useMapData";
import { useStore } from "../data/useStore";
import { randomLightColor } from "seed-to-color";
import { Row, Col } from "reactstrap";

interface CurseProps {
	nrc: Nrc;
  curse: Curse
}
const Curse: FC<CurseProps> = ({ nrc, curse }) => {
	const schedules = useStore(state => state.schedules);
	const index = useStore(state => state.index);
	const setIndex = useStore(state => state.setIndex);

	const availableSch = useMemo(() => {
		const filters = schedules[index]?.nrcs
			.map(n => ({ nrc: n.nrc, curse: n.curse }))
			.filter(n => n.nrc !== nrc.nrc);
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
		<div
			className={appStyle.shadow}
			style={{
				marginBlock: ".5rems",
				background: `#${randomLightColor(nrc.name)}`,
			}}
		>
			<Row>
				<Col xl={12}></Col>
				<b>{curse.name}</b>
				<Col xl={12}>
					{currIdx + 1} / {availableSch.length}
					<button
						onClick={() => {
							setIndex(availableSchIndex[currIdx - 1]);
						}}
						disabled={currIdx === 0}
					>
						-
					</button>
					<button
						onClick={() => {
							setIndex(availableSchIndex[currIdx + 1]);
						}}
						disabled={currIdx + 1 === availableSch.length}
					>
						+
					</button>
				</Col>
			</Row>
			<p style={{ margin: 0, marginBottom: ".5rem" }}></p>
			<div className={appStyle.shadow}>
				<p style={{ margin: 0 }}>
					<b>profesor: </b> {nrc.teacher}
				</p>
				<p style={{ margin: 0 }}>
					<b>nrc: </b>
					{nrc.nrc}
				</p>
				<p style={{ margin: 0 }}>
					<b>disponible: </b>
					{nrc.available}
				</p>
			</div>
		</div>
	);
};

export default Curse;
