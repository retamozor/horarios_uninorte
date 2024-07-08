import { FC, useEffect, useState } from "react";
import {
	Button,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "reactstrap";
import { useStore } from "../../data/useStore";
import Select, { MultiValue } from "react-select";
import { Proyeccion } from "../../hooks/useProyeccion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faSpinner } from "@fortawesome/free-solid-svg-icons";
import GroupingModal from "./GroupingModal";

interface ProyeccionModalProps {
	isOpen: boolean;
	toggle: () => void;
}

const ProyeccionModal: FC<ProyeccionModalProps> = ({ isOpen, toggle }) => {
	const getHorun = useStore(state => state.getHorun);
	const proyeccion = useStore(state => state.proyeccion);
	const setSelectedCurses = useStore(state => state.setSelectedCurses);
	const selectedCurses = useStore(state => state.selectedCurses);
	const isLoadingProyeccion = useStore(state => state.isLoadingProyeccion);
	const isLoadingCurses = useStore(state => state.isLoadingCurses);
	const setGroups = useStore(state => state.setGroups);
	const [value, setValue] = useState<MultiValue<Proyeccion>>(selectedCurses);
	const [isOpenGrouping, setIsOpenGrouping] = useState(false);

	useEffect(() => {
		function onCursesLoadEnd() {
			if(isOpen) {
				setIsOpenGrouping(true);
			}
		}

		window.addEventListener("onCursesLoadEnd", onCursesLoadEnd);

		return () => {
			window.removeEventListener("onCursesLoadEnd", onCursesLoadEnd);
		};
	}, [isOpen]);

	return (
		<Modal toggle={toggle} isOpen={isOpen}>
			<ModalHeader toggle={toggle}>
				<FontAwesomeIcon icon={faCalendarDays} /> Mi proyección -{" "}
				{getHorun().periodo}
			</ModalHeader>
			<ModalBody>
				{isLoadingCurses ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "133px",
						}}
					>
						<FontAwesomeIcon icon={faSpinner} spin size="2x" color="gray" />
					</div>
				) : (
					<>
						<p>
							<b>Total creditos: </b>
							{value?.reduce((prev, curr) => prev + curr.CREDITOS, 0)}
						</p>
						<Label style={{ margin: 0 }} htmlFor="proyeccion">
							Cursos
						</Label>
						<Select
							inputId="proyeccion"
							options={proyeccion}
							getOptionLabel={opt =>
								`${opt.NOMBRE} (${opt.CREDITOS} creditos): ${opt.MATERIACURSO}`
							}
							placeholder={"Nombre (creditos): MATERIA-CURSO"}
							isLoading={isLoadingProyeccion}
							getOptionValue={opt => opt.MATERIACURSO}
							value={value}
							isMulti
							onChange={opt => {
								setValue(opt)
								setGroups([]);
							}}
						/>
					</>
				)}

				<GroupingModal
					isOpen={isOpenGrouping}
					toggle={() => {
						setIsOpenGrouping(o => !o);
						toggle();
					}}
				/>
			</ModalBody>
			<ModalFooter>
				<Button
					color="danger"
					onClick={() => {
						toggle();
					}}
				>
					Cancelar
				</Button>
				<Button
					color="success"
					onClick={() => {
						setSelectedCurses(value.map(val => val));
						if (value.length === 0) {
							toggle();
						}
					}}
				>
					Guardar
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ProyeccionModal;
