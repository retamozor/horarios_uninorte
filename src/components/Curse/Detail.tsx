import { FC } from "react";
import appStyle from "../../assets/css/app.module.css";
import { Collapse } from "reactstrap";
import { Nrc } from "../../hooks/useMapData";

interface DetailProps {
	isOpen: boolean;
	nrc?: Nrc;
	showName?: boolean;
	print?: boolean;
}

const Detail: FC<DetailProps> = ({ isOpen, nrc, showName, print }) => {
	return (
		<Collapse isOpen={isOpen}>
			<div className={print ? appStyle["show-on-print"] : appStyle.shadow}>
				{showName || print ? (
					<p style={{ margin: 0 }}>
						<b>{nrc?.name ?? ""}</b>
					</p>
				) : null}
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
