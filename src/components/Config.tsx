import { Form, Formik } from "formik";
import { FC } from "react";
import {
	Button,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "reactstrap";
import { useStore } from "../data/useStore";

interface ConfigProps {
	isOpen: boolean;
	toggle: () => void;
}

const Config: FC<ConfigProps> = ({ isOpen, toggle }) => {
	const includeUnavailable = useStore(state => state.includeUnavailable);
	const setIncludeUnavailable = useStore(state => state.setIncludeUnavailable);
	return (
		<Modal isOpen={isOpen} toggle={toggle}>
			<ModalHeader toggle={toggle}>Ajustes</ModalHeader>
			<Formik
				onSubmit={({ includeUnavailable }) => {
					setIncludeUnavailable(includeUnavailable);
					toggle();
				}}
				initialValues={{ includeUnavailable }}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModalBody>
							<FormGroup switch>
								<Input
									id="includeUnavailable"
									type="switch"
									role="switch"
									checked={values.includeUnavailable}
									onChange={e => {
										setFieldValue(`includeUnavailable`, e.target.checked);
									}}
								/>
								<Label htmlFor="includeUnavailable" check>
									incluir NRC sin cupos disponibles
								</Label>
							</FormGroup>
						</ModalBody>
						<ModalFooter>
							<Button type="button" color="danger" onClick={toggle}>
								Cancelar
							</Button>
							<Button type="submit" color="success">
								Guardar
							</Button>
						</ModalFooter>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

export default Config;
