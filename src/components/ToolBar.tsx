import { Button, ButtonGroup, Col } from "reactstrap";
import appStyle from "../assets/css/app.module.css";
import { useStore } from "../data/useStore";
import Curse from "./Curse";
import { useEffect } from "react";
import api from "../helpers/api";

const ToolBar = () => {
	const increase = useStore(state => state.increase);
	const decrease = useStore(state => state.decrease);
	const index = useStore(state => state.index);
	const schedules = useStore(state => state.schedules);
	const curses = useStore(state => state.curses);

	useEffect(() => {
    const controller = new AbortController()
		const horun = JSON.parse(localStorage.getItem("horun") ?? '{"token": ""}');
		api
			.get(`/proyeccion/${horun.pidm}/${horun.periodo}`, {signal: controller.signal})
			.then(res => console.log(res));

    return () => {
      controller.abort()
    }
	}, []);
	// console.clear();
	return (
		<div className={[appStyle.toolBar, appStyle.shadow].join(" ")}>
			<Col
				style={{
					position: "sticky",
					top: "-0.5rem",
					margin: "-0.5rem",
					background: "white",
					zIndex: 1,
					padding: "0.5rem",
					marginBottom: 0,
					paddingBottom: 0,
				}}
			>
				Horario {index + 1} / {schedules.length}
				<ButtonGroup className="mx-2">
					<Button color="primary" onClick={() => decrease(1)}>
						-
					</Button>
					<Button color="primary" onClick={() => increase(1)}>
						+
					</Button>
				</ButtonGroup>
				<hr
					style={{
						marginInline: "-0.5rem",
						marginBottom: 0,
						marginTop: "0.5rem",
					}}
				/>
			</Col>
			{curses.map(curse => {
				const schedule = schedules[index];
				if (schedule === undefined) return null;
				const nrc = schedule.nrcs.find(nrc => nrc.curse === curse.curse);
				if (nrc === undefined) return null;
				return <Curse nrc={nrc} key={nrc.nrc} curse={curse} />;
			})}
		</div>
	);
};

export default ToolBar;
