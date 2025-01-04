import appStyle from "../assets/css/app.module.css";
import useProyeccion from "../hooks/useProyeccion";
import DetailLayout from "./DetailLayout/DetailLayout";
import ToolBar from "./ToolBar/ToolBar";
import WeekLayout from "./WeekLayout/WeekLayout";

const Layout = () => {
	useProyeccion();
	return (
		<div id="layout-horario-un" className={appStyle.layout}>
			<ToolBar />
			<WeekLayout />
			<DetailLayout />
		</div>
	);
};

export default Layout;
