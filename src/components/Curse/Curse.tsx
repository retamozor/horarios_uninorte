import appStyle from "../../assets/css/app.module.css";
import { FC, useEffect, useMemo, useState } from "react";
import { Curse, Nrc } from "../../hooks/useMapData";
import { useStore } from "../../data/useStore";
import { randomLightColor } from "seed-to-color";
import {
	Row,
	Col,
	Button,
	ButtonGroup,
	Collapse,
	UncontrolledTooltip,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCaretLeft,
	faCaretRight,
	faChevronDown,
	faFilter,
} from "@fortawesome/free-solid-svg-icons";
import FiltersModal from "./FiltersModal";

interface CurseProps {
	nrc?: Nrc;
	curse: Curse;
	expand: boolean;
}
const Curse: FC<CurseProps> = ({ nrc, curse, expand }) => {
	const schedules = useStore(state => state.schedules);
	const index = useStore(state => state.index);
	const setIndex = useStore(state => state.setIndex);
	const filteredCurses = useStore(state => state.filteredCurses);
	const [open, setOpen] = useState(false);
	const [filtersOpen, setFiltersOpen] = useState(false);

	const toggle = () => setOpen(o => !o);

	const availableSch = useMemo(() => {
		const filters = schedules[index]?.nrcs
			.map(n => ({ nrc: n.nrc, curse: n.curse }))
			.filter(n => n.nrc !== nrc?.nrc);
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

	const nrcs = filteredCurses.find(c => c.curse === curse.curse)?.nrcs ?? [];

	useEffect(() => {
		setOpen(expand);
	}, [expand]);

	return (
		<div
			className={appStyle.shadow}
			style={{
				marginBlock: ".5rems",
				background: `#${randomLightColor(curse.name)}`,
			}}
		>
			<Row>
				<Col sm={8} className="mb-2">
					<b>{curse.name}</b>
				</Col>
				<Col sm={4} className="d-flex justify-content-end mb-2">
					{currIdx + 1} / {availableSch.length}
					<ButtonGroup className="mx-2" size="sm">
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
				</Col>
				<Col xs={9} className="mb-2">
					{nrcs.map(curseNrc => (
						<Button
							key={curseNrc.nrc}
							className="mx-1"
							size="sm"
							color="primary"
							active={curseNrc.nrc === nrc?.nrc}
							style={{
								borderRadius: "50rem",
								display: "inline-block",
								padding: "0.1rem 0.5rem",
								border: "none",
							}}
							disabled={!schedules.some(sch =>
								sch.nrcs.some(schNrc => schNrc.nrc === curseNrc.nrc)
							)}
							onClick={() => {
								if (curseNrc.nrc === nrc?.nrc) return;
								const newIndex = schedules.findIndex(sch =>
									sch.nrcs.some(schNrc => schNrc.nrc === curseNrc.nrc)
								);
								if (newIndex === -1) return;
								setIndex(newIndex);
							}}
						>
							{curseNrc.nrc}
						</Button>
					))}
				</Col>
				<Col xs={3} className="mb-2">
					<ButtonGroup className="mx-2  float-end" size="sm">
						<Button
							size="sm"
							color="primary"
							id={`${curse.curse}-filter`}
							onClick={() => setFiltersOpen(true)}
						>
							<FontAwesomeIcon icon={faFilter} />
						</Button>
						<UncontrolledTooltip
							target={`${curse.curse}-filter`}
							delay={{
								hide: 200,
								show: 1000,
							}}
						>
							Filtrar profesores
						</UncontrolledTooltip>
						<Button
							id={`${curse.curse}-expand`}
							size="sm"
							color="primary"
							onClick={toggle}
						>
							<FontAwesomeIcon
								icon={faChevronDown}
								rotation={open ? 180 : undefined}
							/>
							<UncontrolledTooltip
								target={`${curse.curse}-expand`}
								delay={{
									hide: 200,
									show: 1000,
								}}
							>
								{open ? "Contraer" : "Expandir"}
							</UncontrolledTooltip>
						</Button>
					</ButtonGroup>
				</Col>
			</Row>
			<Collapse isOpen={open}>
				<div className={appStyle.shadow}>
					<p style={{ margin: 0 }}>
						<b>profesor: </b> {nrc?.teacher ?? ""}
					</p>
					<p style={{ margin: 0 }}>
						<b>nrc: </b>
						{nrc?.nrc ?? ""}
					</p>
					<p style={{ margin: 0 }}>
						<b>disponible: </b>
						{nrc?.available ?? ""}
					</p>
				</div>
			</Collapse>
			<FiltersModal
				isOpen={filtersOpen}
				toggle={() => setFiltersOpen(false)}
				curse={curse}
			/>
		</div>
	);
};

export default Curse;
