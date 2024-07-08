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
	const originalCurse = curses.find(c => c.curse === curse.curse)!;

	const teachers = useMemo(() => {
		const teacherNames = Array.from(
			new Set(originalCurse.nrcs.map(nrc => `${nrc.teacher}:${nrc.curse}`))
		);
		const t = teacherNames
			.map(teacher => ({
				name: teacher.split(":")[0],
				curse: teacher.split(":")[1],
				active:
					filter[originalCurse.curse]
						?.filter(nrc => nrc.teacher === teacher.split(":")[0])
						.some(nrc => nrc.active) ?? true,
			}))
			.sort((a, b) => {
				if (a.curse === b.curse) return 0;
				return a.curse > b.curse ? 1 : -1;
			});
		return t;
	}, [originalCurse, filter]);

	const nrcs = useMemo(() => {
		return originalCurse.nrcs.map(nrc => ({
			...nrc,
			active:
				filter[originalCurse.curse]?.find(nrc2 => nrc2.nrc === nrc.nrc)
					?.active ?? true,
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
										<>
											{originalCurse.curse !== teacher.curse &&
											values.teachers.filter(t => t.curse === teacher.curse)[0]
												.name === teacher.name ? (
												<p className="mb-2">
													<b>
														{
															originalCurse.nrcs.find(
																n => n.curse === teacher.curse
															)?.name
														}
													</b>
												</p>
											) : null}
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
															if (nrc.curse !== teacher.curse) return;
															setFieldValue(
																`nrcs.${i}.active`,
																e.target.checked
															);
														});
													}}
												/>
												<Label htmlFor={`teachers.${i}`} check>
													{teacher.name}
												</Label>
											</FormGroup>
										</>
									))}
								</Col>
								<Col md="12">
									<p className="mb-2">
										<b>Cursos</b>
									</p>
									{values.nrcs.map((nrc, i) =>
										values.teachers.find(teacher => teacher.curse === nrc.curse)
											?.active ?? false ? (
											<div
												onClick={() =>
													setFieldValue(`nrcs.${i}.active`, !nrc.active)
												}
												key={nrc.nrc}
												className={`${appStyle.shadow} mb-2`}
												style={{ cursor: "pointer" }}
											>
												<Row>
													{originalCurse.curse !== nrc.curse ? (
														<Col md="12">
															<b>{nrc.name}</b>
														</Col>
													) : null}
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
														{nrc.available} / {nrc.capacity}
													</Col>
													<Col md="12">
														<b>Horario: </b>
														{nrc.schedules.map(sch => (
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
										) : null
									)}
								</Col>
							</Row>
						</ModalBody>
						<ModalFooter>
							<Button
								type="button"
								color="danger"
								onClick={() => {
									toggle();
								}}
							>
								Cancelar
							</Button>
							<Button color="primary" type="submit">
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
