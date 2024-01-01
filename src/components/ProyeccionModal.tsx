import { FC, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useStore } from "../data/useStore";
import Select, { MultiValue } from "react-select";
import { Proyeccion } from "../hooks/useProyeccion";

interface ProyeccionModalProps {
	isOpen: boolean;
	toggle: () => void;
}

const ProyeccionModal: FC<ProyeccionModalProps> = ({ isOpen, toggle }) => {
	const getHorun = useStore(state => state.getHorun);
	const proyeccion = useStore(state => state.proyeccion);
	const setSelectedCurses = useStore(state => state.setSelectedCurses);
	const [value, setValue] = useState<MultiValue<Proyeccion>>([]);


	return (
		<Modal toggle={toggle} isOpen={isOpen}>
			<ModalHeader toggle={toggle}>
				Mi proyección - {getHorun().periodo}
			</ModalHeader>
			<ModalBody>
				<Select
					options={proyeccion}
					getOptionLabel={opt =>
						`${opt.NOMBRE} (${opt.CREDITOS} creditos): ${opt.MATERIACURSO}`
					}
					getOptionValue={opt => opt.MATERIACURSO}
					value={value}
					isMulti
					onChange={opt => setValue(opt)}
				/>
			</ModalBody>
			<ModalFooter>
				<Button
					onClick={() => {
						toggle();
            setSelectedCurses(value.map(val => val))
					}}
				>
					guardar
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ProyeccionModal;
