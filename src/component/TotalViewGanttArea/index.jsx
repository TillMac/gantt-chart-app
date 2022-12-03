import { Box, Divider, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { GanttGroup } from '../GanttArea/GanttGroup';

const TotalViewGanttArea = () => {
	const ganttData = useSelector((state) => state.ganttDataRedux);
	const allGanttData = ganttData.projects.map((project) => {
		if (project.list.length !== 0) {
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
		}
		return {
			...project,
		};
	});
	return (
		<Box sx={{ width: '100%' }}>
			{!ganttData.loadingStatus.tasks ? (
				allGanttData.length !== 0 ? (
					allGanttData.map((project) => {
						return (
							<div key={project.id}>
								<GanttGroup project={project} />
								<Divider />
							</div>
						);
					})
				) : (
					<Box
						sx={{
							display: 'flex',
							width: '100%',
							textAlign: 'center',
							alignItems: 'center',
							justifyContent: 'center',
							height: '60vh',
							color: (theme) => theme.palette.other.text,
						}}>
						<p style={{ width: '100%', fontSize: '24px', fontWeight: '400' }}>
							There's no data here, please create a new project!
						</p>
					</Box>
				)
			) : (
				<Box sx={{ maxWidth: '90%', ml: 'auto', mr: 'auto', mt: 1.5 }}>
					<Skeleton varient='rounded' width={'20%'} sx={{ fontSize: '36px' }} />
					<Skeleton
						varient='rounded'
						width={'100%'}
						height={150}
						sx={{ mt: -2 }}
					/>
				</Box>
			)}
		</Box>
	);
};

export default TotalViewGanttArea;
