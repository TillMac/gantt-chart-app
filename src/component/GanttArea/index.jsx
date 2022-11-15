import { Box } from '@mui/material';
import { Gantt } from 'gantt-task-react';
import { useParams } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

import 'gantt-task-react/dist/index.css';

const GanttArea = () => {
	const params = useParams();
	const ganttData = useSelector((state) => state.ganttDataRedux);
	const testGantt = ganttData.map((project) => {
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
			{!!testGantt.some((project) => project.name === params.name) ? (
				testGantt
					.filter((project) => project.name === params.name)
					.map((project) => {
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
							</Box>
						);
					})
			) : (
				<p>Wrong site, plz go back... Zzzz</p>
			)}
		</Box>
	);
};

export default GanttArea;
