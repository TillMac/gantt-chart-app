import { DeleteOutline } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProjectFromGanttData } from '../../../store/ganttDataSlice';
import { deleteProjectCat } from '../../../store/projectCatSlice';

export default function DeleteButton({ project }) {
	const dispatch = useDispatch();
	const catDeleteHandler = (e) => {
		console.log('try to delete so hard...');
		e.preventDefault();
		dispatch(deleteProjectCat(project.id));
		dispatch(deleteProjectFromGanttData(project.id));
	};

	return (
		<IconButton edge='end' onClick={catDeleteHandler}>
			<DeleteOutline />
		</IconButton>
	);
}
