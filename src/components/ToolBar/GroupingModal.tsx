import { FC, useMemo, useState } from "react";
import {
	Alert,
	Button,
	Col,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
} from "reactstrap";
import { useStore } from "../../data/useStore";
import Select from "react-select";
import appStyle from "../../assets/css/app.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faObjectGroup } from "@fortawesome/free-solid-svg-icons";

interface GroupingModalProps {
	isOpen: boolean;
	toggle: () => void;
}

const GroupingModal: FC<GroupingModalProps> = ({ isOpen, toggle }) => {
	const curses = useStore(state => state.curses);
	const isLoadingProyeccion = useStore(state => state.isLoadingProyeccion);
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const groups = useStore(state => state.groups);
	const addGroup = useStore(state => state.addGroup);
	const setGroup = useStore(state => state.setGroup);
	const deleteGroup = useStore(state => state.deleteGroup);
	const addGroupToCurses = useStore(state => state.addGroupToCurses);

	const options = useMemo(() => {
		const groupCurses = groups.flatMap(g => g.curses);
		return curses.filter(
			curse => !groupCurses.some(c => c.curse === curse.curse)
		);
	}, [groups]);

	const save = () => {
		setMessage("");
		if (groups.length === 0) {
			setMessage("No ha creado ningun grupo");
			return;
		}
		if (groups.some(g => g.curses.length < 2)) {
			setMessage("No puede crear grupos con menos de 2 cursos seleccionados");
			return;
		}

		addGroupToCurses();
		toggle();
	};

	return (
		<Modal toggle={toggle} isOpen={isOpen}>
			<ModalHeader toggle={toggle}>
				<FontAwesomeIcon icon={faObjectGroup} /> Agrupar Cursos
			</ModalHeader>
			<ModalBody>
				<Row>
					<Col md="8" className="mt-2">
						<Label style={{ margin: 0 }} htmlFor="name">
							Nombre del grupo
						</Label>
						<Input
							id="name"
							placeholder={"Ingresa un nombre"}
							onChange={e => {
								setName(e.target.value);
							}}
							value={name}
						/>
					</Col>
					<Col md="4" className="mt-2">
						<Button
							color="primary"
							className="float-end mt-4"
							onClick={() => {
								addGroup(name);
								setName("");
								setMessage("");
							}}
							disabled={name.length < 3}
						>
							Crear grupo
						</Button>
					</Col>
					<Col md="12" className="mt-2">
						<Alert
							color="warning"
							isOpen={message.length > 0}
							className="m-0 p-2"
						>
							{message}
						</Alert>
					</Col>
				</Row>
				<hr />
				{groups.map(group => (
					<div
						className={appStyle.shadow}
						style={{
							marginBlock: ".5rem",
						}}
					>
						<Label style={{ margin: 0 }} htmlFor="name">
							Nombre del grupo
						</Label>
						<Input
							id="name"
							placeholder={"Nombre del grupo"}
							onChange={e => {
								setGroup(group.curse, g => ({
									...g,
									name: e.target.value,
								}));
							}}
							value={group.name}
							disabled
						/>

						<Label style={{ margin: 0 }} htmlFor="curses">
							Seleccionar cursos
						</Label>
						<Select
							inputId="curses"
							options={options}
							getOptionLabel={opt => `${opt.name}: ${opt.curse}`}
							placeholder={"Nombre: MATERIA-CURSO"}
							isLoading={isLoadingProyeccion}
							getOptionValue={opt => opt.curse}
							value={group?.curses}
							isMulti
							onChange={opt => {
								if (opt === null) return;
								if (opt.length > 1) {
									setMessage("");
								}
								setGroup(group.curse, g => ({
									...g,
									curses: [...opt],
								}));
							}}
						/>
						<Button
							size="sm"
							className="mt-2"
							color="danger"
							onClick={() => {
								deleteGroup(group.curse);
							}}
						>
							Eliminar
						</Button>
					</div>
				))}
			</ModalBody>
			<ModalFooter>
				<Button
					color="danger"
					onClick={() => {
						toggle();
					}}
				>
					Omitir
				</Button>
				<Button color="success" onClick={save}>
					Guardar
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default GroupingModal;
