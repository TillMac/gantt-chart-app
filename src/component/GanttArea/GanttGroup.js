import { Box } from '@mui/material';
import { Gantt } from 'gantt-task-react';
import React from 'react';
import 'gantt-task-react/dist/index.css';
import { useDispatch } from 'react-redux';
import { deleteTaskFromGanttData } from '../../store/ganttDataSlice';

export const GanttGroup = ({ project }) => {
	const dispatch = useDispatch();

	const taskDeleteHandler = (task) => {
		const conf = window.confirm(`Are you sure about delete ${task.name} ?`);
		!!conf && dispatch(deleteTaskFromGanttData(task));
	};

	return (
		<Box key={project.id} sx={{ maxWidth: '90%', ml: 'auto', mr: 'auto' }}>
			<h3>{project.projectName}</h3>
			{project.list.length !== 0 ? (
				<Gantt tasks={project.list} onDoubleClick={taskDeleteHandler} />
			) : (
				<p>There's no data yet!</p>
			)}
		</Box>
	);
};
