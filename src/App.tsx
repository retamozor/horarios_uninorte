import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Layout from "./components/Layout";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	const [open, setOpen] = useState(false);
	const toggle = () => setOpen(o => !o);

	return (
		<>
			<Button style={{position: 'absolute', bottom: '1rem', right: '1rem'}} color="secondary" onClick={toggle}>
				Abrir
			</Button>
			<Modal isOpen={open} toggle={toggle} fade={false} fullscreen>
				<ModalHeader toggle={toggle}>Tu Horario</ModalHeader>
				<ModalBody>
					<Layout />
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={toggle}>
						Cerrar
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}

export default App;
