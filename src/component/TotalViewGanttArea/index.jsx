import { Box, Divider } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { GanttGroup } from '../GanttArea/GanttGroup';

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
						<div key={project.id}>
							<GanttGroup project={project} />
							{/* <Box
								key={project.id}
								sx={{ maxWidth: '90%', ml: 'auto', mr: 'auto' }}>
								<h3>{project.projectName}</h3>
								{project.list.length !== 0 ? (
									<Gantt tasks={project.list} />
								) : (
									<p>There's no data yet!</p>
								)}
							</Box> */}
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
						height: '75vh',
						color: (theme) => theme.palette.other.text,
					}}>
					<p style={{ width: '100%', fontSize: '24px', fontWeight: '400' }}>
						There's no data here, please create a new project!
					</p>
				</Box>
			)}
		</Box>
	);
};

export default TotalViewGanttArea;
