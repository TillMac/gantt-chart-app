import { Box } from '@mui/material';
import { Gantt, ViewMode } from 'gantt-task-react';
import React from 'react';
import 'gantt-task-react/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteTaskFromGanttData,
	editTaskNameInGanttData,
} from '../../store/ganttDataSlice';
import { API } from 'aws-amplify';

export const GanttGroup = ({ project }) => {
	const dispatch = useDispatch();
	const timeView = useSelector((state) => state.timeView);
	const isListOpen = useSelector((state) => state.listOpen);

	let columnWidth = 65;
	if (timeView.view === ViewMode.Year) {
		columnWidth = 350;
	} else if (timeView.view === ViewMode.Month) {
		columnWidth = 300;
	} else if (timeView.view === ViewMode.Week) {
		columnWidth = 250;
	}

	const deleteTaskHandler = (task) => {
		console.log(task, 'task');
		const conf = window.confirm(`Are you sure about delete ${task.name} ?`);
		!!conf &&
			API.del('ganttTasksApi', `/gantttasks/userId/${task.id}`, {
				response: true,
			}).then((response) => console.log(response, 'from del API')) &&
			dispatch(deleteTaskFromGanttData(task));
	};

	const editTaskHandler = (task) => {
		let editedTask = {};
		const prompt = window.prompt('Please enter a new task name：').trim();
		if (prompt !== undefined && prompt !== '') {
			editedTask = {
				name: prompt,
				project: task.project,
				projectId: task.projectId,
				id: task.id,
			};
		}
		dispatch(editTaskNameInGanttData(editedTask));
	};

	return (
		<Box key={project.id} sx={{ maxWidth: '90%', ml: 'auto', mr: 'auto' }}>
			<h3>{project.name}</h3>
			{project.list.length !== 0 ? (
				<Gantt
					tasks={project.list}
					onDelete={deleteTaskHandler}
					onDoubleClick={editTaskHandler}
					viewMode={timeView.view}
					listCellWidth={isListOpen.status ? '155px' : ''}
					columnWidth={columnWidth}
				/>
			) : (
				<p>There's no data yet!</p>
			)}
		</Box>
	);
};
