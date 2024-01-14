import { FC } from "react";
import appStyle from "../../assets/css/app.module.css";
import { Collapse } from "reactstrap";
import { Nrc } from "../../hooks/useMapData";

interface DetailProps {
	isOpen: boolean;
	nrc?: Nrc;
}

const Detail: FC<DetailProps> = ({ isOpen, nrc }) => {
	return (
		<Collapse isOpen={isOpen}>
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
					{nrc?.available ?? ""} / {nrc?.capacity ?? ""}
				</p>
			</div>
		</Collapse>
	);
};

export default Detail;
