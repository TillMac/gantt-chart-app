import { EditOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { editProjectInGanttData } from '../../../store/ganttDataSlice';
import { editProjectCat } from '../../../store/projectCatSlice';

export const EditButton = ({ project }) => {
	const dispatch = useDispatch();
	const catEditHandler = (e) => {
		e.preventDefault();
		let editedCatName = {};
		const prompt = window.prompt('Please enter a new project name：').trim();
		if (prompt !== undefined && prompt !== '') {
			editedCatName = {
				projectName: prompt.trim(),
				name: prompt.replace(/\s*/g, ''),
				id: project.id,
			};
		}
		console.log('editedCatName', editedCatName);
		dispatch(editProjectCat(editedCatName));
		dispatch(editProjectInGanttData(editedCatName));
	};

	return (
		<IconButton edge='end' onClick={catEditHandler}>
			<EditOutlined />
		</IconButton>
	);
};
