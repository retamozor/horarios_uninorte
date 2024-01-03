import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Layout from "./components/Layout";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	const [open, setOpen] = useState(false);
	const toggle = () => setOpen(o => !o);

	return (
		<>
			<Button style={{position: 'fixed', bottom: '1rem', right: '1rem'}} color="primary" onClick={toggle}>
				Abrir
			</Button>
			<Modal isOpen={open} toggle={toggle} fade={false} fullscreen>
				<ModalHeader toggle={toggle}>Mi Horario</ModalHeader>
				<ModalBody>
					<Layout />
				</ModalBody>
				<ModalFooter>
					<Button color="danger" onClick={toggle}>
						Cerrar
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}

export default App;
