import { Button, ButtonGroup, Col, Row } from "reactstrap";
import appStyle from "../assets/css/app.module.css";
import { useStore } from "../data/useStore";
import Curse from "./Curse/Curse";
import { useState } from "react";
import ProyeccionModal from "./ProyeccionModal";

const ToolBar = () => {
	const increase = useStore(state => state.increase);
	const decrease = useStore(state => state.decrease);
	const index = useStore(state => state.index);
	const schedules = useStore(state => state.schedules);
	const curses = useStore(state => state.curses);

	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(o => !o);

	// console.clear();
	return (
		<div className={[appStyle.toolBar, appStyle.shadow].join(" ")}>
			<div className={appStyle["toolBar-header"]}>
				<Row>
					<Col md="12" className="mb-2">
						<Button color="primary" onClick={() => toggle()}>
							Mi Proyeccion
						</Button>
					</Col>
					<Col>
						Horario {index + 1} / {schedules.length}, Puntaje {schedules[index]?.score ?? 0}
					</Col>
					<Col>
						<ButtonGroup className="mx-2 float-end" size="sm">
							<Button color="primary" onClick={() => decrease(1)}>
								-
							</Button>
							<Button color="primary" onClick={() => increase(1)}>
								+
							</Button>
						</ButtonGroup>
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
				return <Curse nrc={nrc} key={nrc?.nrc ?? `${curse.curse}-no-nrc` } curse={curse} />;
			})}
			<ProyeccionModal isOpen={isOpen} toggle={toggle} />
		</div>
	);
};

export default ToolBar;
