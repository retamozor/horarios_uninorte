import { FC } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import appStyle from "../../assets/css/app.module.css";
import Cell, { Day, Hour } from "../../containers/Cell";
import { Form, Formik } from "formik";
import { useStore } from "../../data/useStore";
import { Nrc } from "../../hooks/useMapData";

interface FilterModalModalProps {
	isOpen: boolean;
	toggle: () => void;
	days: {
		day: Day;
		label: string;
	}[];
	hours: {
		label: string;
		start: Hour;
		end: Hour;
	}[];
}

const FilterModal: FC<FilterModalModalProps> = ({
	isOpen,
	toggle,
	days,
	hours,
}) => {
	const filterSchedule = useStore(state => state.filterSchedule);
	const setFilterSchedule = useStore(state => state.setFilterSchedule);

	return (
		<Modal isOpen={isOpen} toggle={toggle} size="lg">
			<Formik
				initialValues={{
					...filterSchedule,
				}}
				onSubmit={values => {
					setFilterSchedule(values);
          toggle();
				}}
			>
				{({ values, setFieldValue }) => {
					const toggleSCH = (
						day: Day,
						start: Hour,
						end: Hour,
						schedules: Nrc["schedules"],
						value?: boolean
					) => {
						const index = schedules.findIndex(
							sch => sch.day === day && sch.start === start && sch.end === end
						);
						console.log({ day, start, end, value, index });
						if (index !== -1) {
							if (value !== undefined && value) return schedules;
							return schedules.filter((_, i) => i !== index);
						}
						if (value !== undefined && !value) return schedules;
						return [
							...schedules,
							{
								classroom: "",
								day,
								start,
								end,
							},
						];
					};
					return (
						<Form>
							<ModalHeader toggle={toggle}></ModalHeader>
							<ModalBody>
								<div
									style={{ maxHeight: "66vh" }}
									className={[appStyle.weekLayout, appStyle.shadow].join(" ")}
								>
									{days.map(({ day, label }) => (
										<Cell
											key={day}
											day={day}
											start="week"
											end="week"
											toolTip={label}
											onClick={() => {
												const activate = hours.every(({ start, end }) =>
													values.nrcs[0].schedules.some(
														sch =>
															sch.day === day &&
															sch.start === start &&
															sch.end === end
													)
												);
												let schedules = [...values.nrcs[0].schedules];
												hours.forEach(({ start, end }) => {
													schedules = toggleSCH(
														day,
														start,
														end,
														[...schedules],
														!activate
													);
												});
												setFieldValue("nrcs.0.schedules", schedules);
											}}
										>
											{label}
										</Cell>
									))}
									{hours.map(({ start, end, label }) => (
										<Cell
											key={`${start}-${end}`}
											day="H"
											start={start}
											end={end}
											toolTip={label}
                      onClick={() => {
												const activate = days.every(({ day }) =>
													values.nrcs[0].schedules.some(
														sch =>
															sch.day === day &&
															sch.start === start &&
															sch.end === end
													)
												);
												let schedules = [...values.nrcs[0].schedules];
												days.forEach(({ day }) => {
													schedules = toggleSCH(
														day,
														start,
														end,
														[...schedules],
														!activate
													);
												});
												setFieldValue("nrcs.0.schedules", schedules);
											}}
										>
											{label}
										</Cell>
									))}
									{days.map(({ day }) =>
										hours.map(({ start, end }) => (
											<Cell
												key={`${start}-${end}`}
												day={day}
												start={start}
												end={end}
												toolTip={`${start}:30 - ${end}:30`}
												color={
													values.nrcs[0].schedules.some(
														sch =>
															sch.day === day &&
															sch.start === start &&
															sch.end === end
													)
														? "#e36f6f"
														: "white"
												}
												onClick={() => {
													const schedules = toggleSCH(day, start, end, [
														...values.nrcs[0].schedules,
													]);
													setFieldValue("nrcs.0.schedules", schedules);
												}}
											></Cell>
										))
									)}
								</div>
							</ModalBody>
							<ModalFooter>
								<Button type="button" onClick={toggle}>
									Cancelar
								</Button>
								<Button color="primary" type="submit">Guardar</Button>
							</ModalFooter>
						</Form>
					);
				}}
			</Formik>
		</Modal>
	);
};

export default FilterModal;
