import appStyle from '../assets/css/app.module.css'
import ToolBar from "./ToolBar";
import WeekLayout from "./WeekLayout";

const Layout = () => {
	return (
		<div className={appStyle.layout}>
			<ToolBar />
			<WeekLayout />
		</div>
	);
};

export default Layout;
