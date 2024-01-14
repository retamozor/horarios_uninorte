import appStyle from "../../assets/css/app.module.css";
import { FC, useEffect, useState } from "react";
import { Curse, Nrc } from "../../hooks/useMapData";
import { useStore } from "../../data/useStore";
import { randomLightColor } from "seed-to-color";
import { Row, Col, Button, ButtonGroup, UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronDown,
	faFilter,
	faToggleOff,
	faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import FiltersModal from "./FiltersModal";
import Detail from "./Detail";
import NrcButton from "./NrcButton";
import CurseNavigator from "./CurseNavigator";

interface CurseProps {
	nrc?: Nrc;
	curse: Curse;
	expand: boolean;
}
const Curse: FC<CurseProps> = ({ nrc, curse, expand }) => {
	const filteredCurses = useStore(state => state.filteredCurses);
	const setFilter = useStore(state => state.setFilter);

	const [open, setOpen] = useState(false);
	const [filtersOpen, setFiltersOpen] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const nrcs = filteredCurses.find(c => c.curse === curse.curse)?.nrcs ?? [];

	const toggle = () => setOpen(o => !o);

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
				<Col
					sm={4}
					className="d-flex justify-content-end align-items-center mb-2"
				>
					<CurseNavigator nrc={nrc?.nrc ?? ""} />
				</Col>
				<Col xs={9} className={`mb-2 ${appStyle["hide-on-print"]}`}>
					{nrcs.map(curseNrc => (
						<NrcButton
							key={curseNrc.nrc}
							active={curseNrc.nrc === nrc?.nrc}
							nrc={curseNrc.nrc}
							available={curseNrc.available}
						/>
					))}
				</Col>
				<Col xs={3} className={`mb-2 ${appStyle["hide-on-print"]}`}>
					<ButtonGroup className="mx-2  float-end" size="sm">
						<Button
							size="sm"
							color="primary"
							id={`${curse.curse}-disabled`}
							onClick={() =>
								setDisabled(d => {
									setFilter(
										curse.curse,
										curse.nrcs.map(nrc => ({
											active: d,
											nrc: nrc.nrc,
											teacher: nrc.teacher,
										}))
									);
									return !d;
								})
							}
						>
							{disabled ? (
								<FontAwesomeIcon icon={faToggleOff} />
							) : (
								<FontAwesomeIcon icon={faToggleOn} />
							)}
						</Button>
						<UncontrolledTooltip
							target={`${curse.curse}-disabled`}
							delay={{
								hide: 200,
								show: 1000,
							}}
						>
							{disabled ? (
								"Habilitar"
							) : (
								"Deshabilitar"
							)}
						</UncontrolledTooltip>
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
			<Detail isOpen={open} nrc={nrc} />
			<FiltersModal
				isOpen={filtersOpen}
				toggle={() => setFiltersOpen(false)}
				curse={curse}
			/>
		</div>
	);
};

export default Curse;
