import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { GanttGroup } from './GanttGroup';

const GanttArea = () => {
	const params = useParams();
	const ganttData = useSelector((state) => state.ganttDataRedux);
	const testGantt = ganttData.projects.map((project) => {
		return {
			...project,
			list: project.list.map((task) => {
				return {
					start: new Date(task.start),
					end: new Date(task.end),
					id: task.id,
					name: task.name,
					project: task.project,
					projectId: task.projectId,
					progress: task.progress,
					type: task.type,
				};
			}),
		};
	});

	return (
		<Box sx={{ width: '100%' }}>
			{!!testGantt.some((project) => project.linkName === params.name) ? (
				testGantt
					.filter((project) => project.linkName === params.name)
					.map((project) => {
						return (
							<div key={project.id}>
								<GanttGroup project={project} />
							</div>
						);
					})
			) : (
				<p>Wrong site, plz go back... Zzzz</p>
			)}
		</Box>
	);
};

export default GanttArea;
