import {
	Box,
	FormControl,
	InputLabel,
	OutlinedInput,
	Select,
	MenuItem,
	Stack,
	TextField,
	Button,
	FormControlLabel,
	Switch,
	FormGroup,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskIntoGanttData } from '../../store/ganttDataSlice';
import { changeView } from '../../store/timeViewSlice';

import { useState } from 'react';
import { closeList, openList } from '../../store/listOpenSlice';
import { API } from 'aws-amplify';

const InputArea = () => {
	const categories = useSelector((state) => state.projectCategories);
	const userData = useSelector((state) => state.userData.userData);
	const [isListOpen, setIsListOpen] = useState(true);
	console.log('isListOpen', isListOpen);
	const dispatch = useDispatch();
	const [taskData, setTaskData] = useState({
		id: null,
		name: '',
		project: '',
		projectId: '',
		type: '',
		start: null,
		end: null,
		progress: 0,
	});
	const [isDateNotValid, setIsDateNotValid] = useState(true);

	const taskNameHandler = (e) => {
		setTaskData({
			...taskData,
			id: uuidv4(),
			name: e.target.value,
			progress: 0,
		});
	};

	const projectNameHandler = (e) => {
		const projectId = categories.cats.find(
			(project) => project.name === e.target.value
		).id;
		setTaskData({
			...taskData,
			project: e.target.value,
			projectId: projectId,
		});
	};

	const taskTypeHandler = (e) => {
		setTaskData({
			...taskData,
			type: e.target.value,
		});
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (isDateNotValid === false) {
			API.post('ganttTasksApi', '/gantttasks/', {
				body: {
					name: taskData.name,
					id: taskData.id,
					projectId: taskData.projectId,
					start: taskData.start.toJSON(),
					end: taskData.end.toJSON(),
					progress: Number(taskData.progress),
					type: taskData.type,
				},
			});
			dispatch(addTaskIntoGanttData(taskData));
			console.log(taskData, 'taskData');
			console.log(taskData.start.toISOString().split('T')[0]);
			console.log(taskData.end.toISOString().split('T')[0]);
			const aDay = 24 * 60 * 60 * 1000;
			const startDateCalendar = new Date(taskData.start.getTime() + aDay)
				.toISOString()
				.split('T')[0];
			const endDateCalendar = new Date(taskData.end.getTime() + aDay)
				.toISOString()
				.split('T')[0];
			if (userData[0].photoLink !== null) {
				fetch(
					'https://www.googleapis.com/calendar/v3/calendars/primary/events',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${userData[0].accessToken}`,
						},
						body: JSON.stringify({
							summary: taskData.name,
							description: `This ${taskData.type} was added by Gantt Chart App automatically.`,
							start: {
								date: startDateCalendar,
							},
							end: {
								date: endDateCalendar,
							},
							colorId: 4,
						}),
					}
				)
					.then((response) => response.json())
					.then((data) => console.log(data));
			}
			setTaskData({
				id: null,
				name: '',
				project: '',
				projectId: '',
				type: '',
				start: null,
				end: null,
				progress: 0,
			});
			setIsDateNotValid(true);
		}
	};

	const timeViewHandler = (e) => {
		const time = e.target.value;
		dispatch(
			changeView({
				view: time,
			})
		);
	};

	const listOpenHandler = (e) => {
		const isChecked = e.target.checked;
		if (!isChecked) {
			dispatch(closeList());
			setIsListOpen(isChecked);
		} else {
			dispatch(openList());
			setIsListOpen(isChecked);
		}
	};

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexWrap: 'wrap',
				height: '40vh',
			}}>
			<Box
				sx={{
					width: '90%',
					height: 180,
					display: 'flex',
					backgroundColor: 'white',
					mt: 2.5,
					mb: 2.5,
					mr: 'auto',
					ml: 'auto',
					borderRadius: 2,
					boxShadow:
						'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
				}}>
				<form
					onSubmit={submitHandler}
					style={{
						display: 'flex',
						margin: 'auto',
						position: 'relative',
						maxWidth: '867px',
						flexWrap: 'wrap',
					}}>
					<Stack direction='row' spacing={2.5} sx={{ position: 'relative' }}>
						<FormControl sx={{ minWidth: '150px' }} required={true}>
							<InputLabel htmlFor='component-outlined'>Task Name</InputLabel>
							<OutlinedInput
								id='component-outlined'
								label='Task Name'
								placeholder='輸入事項名稱...'
								onChange={taskNameHandler}
								value={taskData.name}
							/>
						</FormControl>
						<FormControl sx={{ minWidth: '150px' }} required={true}>
							<InputLabel>Project Name</InputLabel>
							<Select
								label='Project Name'
								onChange={projectNameHandler}
								value={taskData.project}>
								{categories.cats.map((project) => {
									return (
										<MenuItem value={project.name} key={project.name}>
											{project.name}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
						<FormControl sx={{ minWidth: '150px' }} required={true}>
							<InputLabel>Task Type</InputLabel>
							<Select
								label='Task Type'
								placeholder='輸入事項樣式...'
								onChange={taskTypeHandler}
								value={taskData.type}>
								<MenuItem value={'task'}>Task</MenuItem>
								<MenuItem value={'milestone'}>Milestone</MenuItem>
							</Select>
						</FormControl>
						<div style={{ maxWidth: '150px' }}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									label='Start Date'
									value={taskData.start}
									onChange={(startDate) => {
										startDate !== null &&
											setTaskData({
												...taskData,
												start: startDate.$d,
											});
										if (taskData.end !== null) {
											setIsDateNotValid(false);
										}
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</div>
						<div style={{ maxWidth: '150px' }}>
							<LocalizationProvider
								dateAdapter={AdapterDayjs}
								sx={{ maxWidth: '120px' }}>
								<DatePicker
									label='Deadline'
									value={taskData.end}
									onChange={(deadline) => {
										deadline !== null &&
											setTaskData({
												...taskData,
												end: deadline.$d,
											});
										if (taskData.start !== null) {
											setIsDateNotValid(false);
										}
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</div>
					</Stack>
					<Button
						size='large'
						type='submit'
						sx={{
							maxWidth: '150px',
							marginLeft: 'auto',
							mt: 2,
							backgroundColor: (theme) => theme.palette.other.btn,
							color: (theme) => theme.palette.other.white,
						}}
						disabled={isDateNotValid}>
						新增事項
					</Button>
				</form>
			</Box>
			<Box
				sx={{
					width: '90%',
					display: 'flex',
					flexDirection: 'row-reverse',
					ml: 'auto',
					mr: 'auto',
				}}>
				<FormControl
					sx={{
						minWidth: '150px',
					}}>
					<InputLabel>時間刻度</InputLabel>
					<Select
						label='時間刻度'
						defaultValue='Day'
						sx={{ borderRadius: 2 }}
						onChange={timeViewHandler}>
						<MenuItem value={'Day'} key={'Day'}>
							Day
						</MenuItem>
						<MenuItem value={'Week'} key={'Week'}>
							Week
						</MenuItem>
						<MenuItem value={'Month'} key={'Month'}>
							Month
						</MenuItem>
						<MenuItem value={'Year'} key={'Year'}>
							Year
						</MenuItem>
					</Select>
				</FormControl>
				<FormGroup
					sx={{
						mt: 'auto',
						mb: 'auto',
					}}>
					<FormControlLabel
						control={
							<Switch
								checked={isListOpen}
								onChange={listOpenHandler}
								sx={{
									'& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
										backgroundColor: (theme) => theme.palette.other.btn,
									},
								}}
							/>
						}
						label='開啟 Gantt 側欄'
					/>
				</FormGroup>
			</Box>
		</Box>
	);
};

export default InputArea;
