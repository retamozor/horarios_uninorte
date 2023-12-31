import appStyle from "../assets/css/app.module.css";
import { useStore } from "../data/useStore";
import Curse from "./Curse";

const ToolBar = () => {
	const increase = useStore(state => state.increase);
	const decrease = useStore(state => state.decrease);
	const index = useStore(state => state.index);
	const schedules = useStore(state => state.schedules);
	const curses = useStore(state => state.curses);
	// console.clear();
	return (
		<div className={[appStyle.toolBar, appStyle.shadow].join(" ")}>
			<p>
				Horario #{index}
				<button onClick={() => decrease(1)}>-</button>
				<button onClick={() => increase(1)}>+</button>
			</p>

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
