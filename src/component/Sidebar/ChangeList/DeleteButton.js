import { DeleteOutline } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { API } from 'aws-amplify';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProjectFromGanttData } from '../../../store/ganttDataSlice';
import { deleteProjectCat } from '../../../store/projectCatSlice';

export default function DeleteButton({ project }) {
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.userData.userData);
	const ganttTasksData = useSelector((state) => state.ganttDataRedux);
	const catDeleteHandler = (e) => {
		console.log('try to delete so hard...');
		e.preventDefault();
		API.del('projectCatsApi', `/projectcats/userId/${project.id}`, {
			response: true,
		}).then((response) => console.log(response, 'from del cat API'));
		const delProjectData = ganttTasksData.projects.filter(
			(thisProject) => thisProject.id === project.id
		);
		delProjectData[0].list.forEach((task) => {
			if (userData[0].photoLink !== null) {
				fetch(
					`https://www.googleapis.com/calendar/v3/calendars/primary/events/${task.id.replace(
						/-/g,
						''
					)}`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${userData[0].accessToken}`,
						},
					}
				);
			}
			API.del('ganttTasksApi', `/gantttasks/userId/${task.id}`, {
				response: true,
			}).then((response) => console.log(response, 'from del task API'));
		});
		dispatch(deleteProjectCat(project.id));
		dispatch(deleteProjectFromGanttData(project.id));
	};

	return (
		<IconButton edge='end' onClick={catDeleteHandler}>
			<DeleteOutline />
		</IconButton>
	);
}
