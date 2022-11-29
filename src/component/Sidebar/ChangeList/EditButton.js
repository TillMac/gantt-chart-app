import { EditOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { API } from 'aws-amplify';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProjectInGanttData } from '../../../store/ganttDataSlice';
import { editProjectCat } from '../../../store/projectCatSlice';

export const EditButton = ({ project }) => {
	const dispatch = useDispatch();
	const projectCats = useSelector((state) => state.projectCategories);
	const catEditHandler = (e) => {
		e.preventDefault();
		let editedCatName = {};
		const prompt = window.prompt('Please enter a new project name：').trim();
		if (prompt !== undefined && prompt !== '') {
			editedCatName = {
				name: prompt,
				linkName: prompt.replace(/\s*/g, ''),
				id: project.id,
				updatedAt: new Date().toJSON(),
			};
		}
		console.log('editedCatName', editedCatName);
		API.put('projectCatsApi', `/projectcats/userId/${project.id}`, {
			response: true,
			body: {
				name: editedCatName.name,
				updatedAt: editedCatName.updatedAt,
				id: projectCats.id,
				createdAt: projectCats.createdAt,
			},
		}).then((res) => console.log(res));
		dispatch(editProjectCat(editedCatName));
		dispatch(editProjectInGanttData(editedCatName));
	};

	return (
		<IconButton edge='end' onClick={catEditHandler}>
			<EditOutlined />
		</IconButton>
	);
};
