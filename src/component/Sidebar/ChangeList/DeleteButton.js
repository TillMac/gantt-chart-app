import { DeleteOutline } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { API } from 'aws-amplify';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProjectFromGanttData } from '../../../store/ganttDataSlice';
import { deleteProjectCat } from '../../../store/projectCatSlice';

export default function DeleteButton({ project }) {
	const dispatch = useDispatch();
	const catDeleteHandler = (e) => {
		console.log('try to delete so hard...');
		e.preventDefault();
		API.del('projectCatsApi', `/projectcats/userId/${project.id}`, {
			response: true,
		}).then((response) => console.log(response, 'from del API'));
		dispatch(deleteProjectCat(project.id));
		dispatch(deleteProjectFromGanttData(project.id));
	};

	return (
		<IconButton edge='end' onClick={catDeleteHandler}>
			<DeleteOutline />
		</IconButton>
	);
}
