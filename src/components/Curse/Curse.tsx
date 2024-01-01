import appStyle from "../../assets/css/app.module.css";
import { FC, useMemo, useState } from "react";
import { Curse, Nrc } from "../../hooks/useMapData";
import { useStore } from "../../data/useStore";
import { randomLightColor } from "seed-to-color";
import { Row, Col, Button, ButtonGroup, Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faFilter } from "@fortawesome/free-solid-svg-icons";
import FiltersModal from "./FiltersModal";

interface CurseProps {
	nrc: Nrc;
	curse: Curse;
}
const Curse: FC<CurseProps> = ({ nrc, curse }) => {
	const schedules = useStore(state => state.schedules);
	const index = useStore(state => state.index);
	const setIndex = useStore(state => state.setIndex);
	const [open, setOpen] = useState(false);
	const [filtersOpen, setFiltersOpen] = useState(false);
	const toggle = () => setOpen(o => !o);
	const toggleFilter = () => setFiltersOpen(o => !o);

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
				<Col md={8} className="mb-2">
					<b>{curse.name}</b>
				</Col>
				<Col md={4} className="mb-2">
					{currIdx + 1} / {availableSch.length}
					<ButtonGroup className="mx-2  float-end" size="sm">
						<Button
							color="primary"
							onClick={() => {
								setIndex(availableSchIndex[currIdx - 1]);
							}}
							disabled={currIdx === 0}
						>
							-
						</Button>
						<Button
							color="primary"
							onClick={() => {
								setIndex(availableSchIndex[currIdx + 1]);
							}}
							disabled={currIdx + 1 === availableSch.length}
						>
							+
						</Button>
					</ButtonGroup>
				</Col>
				<Col md={9} className="mb-2">
					{curse.nrcs.map(curseNrc => (
						<Button
							className="mx-1"
							size="sm"
							style={{
								borderRadius: "50rem",
								display: "inline-block",
								background: curseNrc.nrc === nrc.nrc ? "#0a58ca" : "#0d6efd",
								padding: "0.1rem 0.5rem",
								border: "none",
							}}
						>
							{curseNrc.nrc}
						</Button>
					))}
				</Col>
				<Col md={3} className="mb-2">
					<ButtonGroup className="mx-2  float-end" size="sm">
						<Button size="sm" color="primary">
							<FontAwesomeIcon icon={faFilter} onClick={toggleFilter} />
						</Button>
						<Button size="sm" color="primary" onClick={toggle}>
							<FontAwesomeIcon icon={faChevronDown} />
						</Button>
					</ButtonGroup>
				</Col>
			</Row>
			<Collapse isOpen={open}>
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
			</Collapse>
			<FiltersModal isOpen={filtersOpen} toggle={toggleFilter} curse={curse} />
		</div>
	);
};

export default Curse;
