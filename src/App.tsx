import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Layout from "./components/Layout";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import appStyles from "./assets/css/app.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Config from "./components/Config";

function App() {
	const [open, setOpen] = useState(false);
	const toggle = () => setOpen(o => !o);
	const [configOpen, setConfigOpen] = useState(false);

	return (
		<>
			<Button
				style={{ position: "fixed", bottom: "1rem", right: "1rem" }}
				color="primary"
				onClick={toggle}
			>
				Abrir
			</Button>
			<Modal isOpen={open} toggle={toggle} fade={false} fullscreen>
				<ModalHeader className={appStyles["hide-on-print"]} toggle={toggle}>
					<Button size="sm" onClick={() => setConfigOpen(true)}>
						<FontAwesomeIcon icon={faGear} />
					</Button>{" "}
					Mi Horario
				</ModalHeader>
				<ModalBody>
					<Layout />
					<Config isOpen={configOpen} toggle={() => setConfigOpen(false)} />
				</ModalBody>
				<ModalFooter className={appStyles["hide-on-print"]}>
					<Button color="danger" onClick={toggle}>
						Cerrar
					</Button>
				</ModalFooter>
			</Modal>
			<ToastContainer />
		</>
	);
}

export default App;
