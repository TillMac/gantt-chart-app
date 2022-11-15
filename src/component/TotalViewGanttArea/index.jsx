import { Box, Divider } from '@mui/material';
import { Gantt } from 'gantt-task-react';
import React from 'react';
import { useSelector } from 'react-redux';

const TotalViewGanttArea = () => {
	const ganttData = useSelector((state) => state.ganttDataRedux);
	const allGanttData = ganttData.map((project) => {
		return {
			...project,
			list: project.list.map((task) => {
				return {
					...task,
					description: 'copy from state',
				};
			}),
		};
	});
	return (
		<Box sx={{ width: '100%' }}>
			{allGanttData.length !== 0 ? (
				allGanttData.map((project) => {
					return (
						<Box
							key={project.id}
							sx={{ maxWidth: '90%', ml: 'auto', mr: 'auto' }}>
							<h3>{project.projectName}</h3>
							{project.list.length !== 0 ? (
								<Gantt tasks={project.list} />
							) : (
								<p>There's no data yet!</p>
							)}
							<Divider />
						</Box>
					);
				})
			) : (
				<p>There's no data here, please create a new project!</p>
			)}
		</Box>
	);
};

export default TotalViewGanttArea;
