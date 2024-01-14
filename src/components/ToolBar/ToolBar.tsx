import { Button, ButtonGroup, Col, Row, UncontrolledTooltip } from "reactstrap";
import appStyle from "../../assets/css/app.module.css";
import { useStore } from "../../data/useStore";
import Curse from "../Curse/Curse";
import { useState } from "react";
import ProyeccionModal from "./ProyeccionModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAnglesDown,
	faCalendarDays,
	faCaretLeft,
	faCaretRight,
	faPrint,
} from "@fortawesome/free-solid-svg-icons";

const ToolBar = () => {
	const increase = useStore(state => state.increase);
	const decrease = useStore(state => state.decrease);
	const index = useStore(state => state.index);
	const max = useStore(state => state.max);
	const schedules = useStore(state => state.schedules);
	const curses = useStore(state => state.curses);

	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(o => !o);

	const [expand, setExpand] = useState(false);
	const toggleExpand = () => setExpand(e => !e);

	return (
		<div className={[appStyle.toolBar, appStyle.shadow].join(" ")}>
			<div className={[appStyle["toolBar-header"], appStyle["hide-on-print"]].join(' ')}>
				<Row>
					<Col xs="6">
						<Button color="primary" size="sm" onClick={() => toggle()}>
							<FontAwesomeIcon icon={faCalendarDays} /> Mi Proyeccion
						</Button>
						<Button className="mx-2" color="primary" size="sm" onClick={() => window.print()}>
							<FontAwesomeIcon icon={faPrint} />
						</Button>
					</Col>
					<Col className="d-flex justify-content-end aling align-items-center">
						<span style={{ fontSize: "1rem", lineHeight: "1rem" }}>
							{schedules.findIndex((_, i) => i === index) + 1} /{" "}
							{schedules.length}
						</span>
						<ButtonGroup className="mx-2" size="sm">
							<Button
								disabled={index === 0}
								color="primary"
								onClick={() => decrease(1)}
							>
								<FontAwesomeIcon icon={faCaretLeft} />
							</Button>
							<Button
								disabled={index === max}
								color="primary"
								onClick={() => increase(1)}
							>
								<FontAwesomeIcon icon={faCaretRight} />
							</Button>
						</ButtonGroup>
						<Button
							id="expand"
							size="sm"
							color="primary"
							onClick={() => toggleExpand()}
						>
							<FontAwesomeIcon
								icon={faAnglesDown}
								rotation={expand ? 180 : undefined}
							/>
						</Button>
						<UncontrolledTooltip
							target="expand"
							delay={{
								hide: 200,
								show: 1000,
							}}
						>
							{expand ? "Contraer todo" : "Expandir todo"}
						</UncontrolledTooltip>
					</Col>
				</Row>

				<hr
					style={{
						marginInline: "-0.5rem",
						marginBottom: 0,
						marginTop: "0.5rem",
					}}
				/>
			</div>
			{curses.map(curse => {
				const schedule = schedules[index];
				const nrc = schedule?.nrcs.find(nrc => nrc.curse === curse.curse);
				return (
					<Curse expand={expand} nrc={nrc} key={curse.curse} curse={curse} />
				);
			})}
			<ProyeccionModal isOpen={isOpen} toggle={toggle} />
		</div>
	);
};

export default ToolBar;
