import appStyle from "../assets/css/app.module.css";
import useProyeccion from "../hooks/useProyeccion";
import ToolBar from "./ToolBar/ToolBar";
import WeekLayout from "./WeekLayout/WeekLayout";

const Layout = () => {
	useProyeccion();
	return (
		<div className={appStyle.layout}>
			<ToolBar />
			<WeekLayout />
		</div>
	);
};

export default Layout;
