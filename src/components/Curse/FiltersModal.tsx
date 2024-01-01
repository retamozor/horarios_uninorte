import appStyle from "../../assets/css/app.module.css";
import { FC, useMemo } from "react";
import {
	Badge,
	Button,
	Col,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
} from "reactstrap";
import { Curse } from "../../hooks/useMapData";
import { Formik, Form } from "formik";
import { useStore } from "../../data/useStore";

interface FiltersModalModalProps {
	isOpen: boolean;
	toggle: () => void;
	curse: Curse;
}

const FiltersModal: FC<FiltersModalModalProps> = ({
	isOpen,
	toggle,
	curse,
}) => {
	const filter = useStore(state => state.filter);
	const setFilter = useStore(state => state.setFilter);
	const curses = useStore(state => state.curses);
  const originalCurse = curses.find(c => c.curse === curse.curse)!

	const teachers = useMemo(() => {
		const teacherNames = Array.from(
			new Set(originalCurse.nrcs.map(nrc => nrc.teacher))
		);
		const t = teacherNames.map(name => ({
			name,
			active:
				filter[originalCurse.curse]
					?.filter(nrc => nrc.teacher === name)
					.some(nrc => nrc.active) ?? true,
		}));
		if (originalCurse.curse === "ART0020") {
			console.log(t);
		}
		return t;
	}, [originalCurse, filter]);

	const nrcs = useMemo(() => {
		return originalCurse.nrcs.map(nrc => ({
			...nrc,
			active:
				filter[originalCurse.curse]?.find(nrc2 => nrc2.nrc === nrc.nrc)?.active ?? true,
		}));
	}, [filter]);

	return (
		<Modal isOpen={isOpen} toggle={toggle}>
			<Formik
				initialValues={{
					teachers,
					nrcs,
				}}
				onSubmit={values => {
					const data = values.nrcs.map(nrc => ({
						nrc: nrc.nrc,
						teacher: nrc.teacher,
						active: nrc.active,
					}));
					console.log(data);
					setFilter(curse.curse, data);
					toggle();
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModalHeader toggle={toggle}>
							{curse.name} - {curse.curse}
						</ModalHeader>
						<ModalBody>
							<Row>
								<Col md="12">
									<p className="mb-2">
										<b>Profesores</b>
									</p>
									{values.teachers.map((teacher, i) => (
										<FormGroup key={teacher.name} switch>
											<Input
												id={`teachers.${i}`}
												type="switch"
												role="switch"
												checked={teacher.active}
												onChange={e => {
													setFieldValue(
														`teachers.${i}.active`,
														e.target.checked
													);
													values.nrcs.forEach((nrc, i) => {
														if (nrc.teacher !== teacher.name) return;
														setFieldValue(`nrcs.${i}.active`, e.target.checked);
													});
												}}
											/>
											<Label htmlFor={`teachers.${i}`} check>
												{teacher.name}
											</Label>
										</FormGroup>
									))}
								</Col>
								<Col md="12">
									<p className="mb-2">
										<b>Cursos</b>
									</p>
									{values.nrcs
										.filter(
											nrc =>
												values.teachers.find(
													teacher => teacher.name === nrc.teacher
												)?.active ?? false
										)
										.map((nrc, i) => (
											<div key={nrc.nrc} className={`${appStyle.shadow} mb-2`}>
												<Row>
													<Col md="9">
														<b>profesor: </b> {nrc.teacher}
													</Col>
													<Col md="3">
														<FormGroup className="float-end" switch>
															<Input
																type="switch"
																role="switch"
																checked={nrc.active}
																onChange={e =>
																	setFieldValue(
																		`nrcs.${i}.active`,
																		e.target.checked
																	)
																}
															/>
														</FormGroup>
													</Col>
													<Col md="6">
														<b>nrc: </b>
														{nrc.nrc}
													</Col>
													<Col md="6">
														<b>disponible: </b>
														{nrc.available}
													</Col>
													<Col md="12">
														<b>Horario: </b>
														{nrc.shcedules.map(sch => (
															<Badge
																key={`${sch.day}${sch.start}${sch.end}`}
																className="mx-1"
															>
																{sch.day}: {sch.start}:30 - {sch.end}:30
															</Badge>
														))}
													</Col>
												</Row>
											</div>
										))}
								</Col>
							</Row>
						</ModalBody>
						<ModalFooter>
							<Button type="submit" onClick={() => {}}>
								Guardar
							</Button>
						</ModalFooter>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

export default FiltersModal;
