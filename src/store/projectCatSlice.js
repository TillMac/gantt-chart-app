import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const projectCatSlice = createSlice({
	name: 'projectCategories',
	initialState,
	reducers: {
		addProjectCat: (state, action) => {
			state.push(action.payload);
		},
		deleteProjectCat: (state, action) => {
			// state = state.filter((project) => {
			// 	return project.id !== action.payload.id;
			// });
			const project = state.find((project) => project.id === action.payload);
			if (project !== undefined) {
				const projectIndex = state.indexOf(project);
				state.splice(projectIndex, 1);
			}
		},
		editProjectCat: (state, action) => {
			const editedProject = action.payload;
			const project = state.find((project) => project.id === editedProject.id);
			const projectIndex = state.indexOf(project);
			state[projectIndex].name = editedProject.name;
			state[projectIndex].projectName = editedProject.projectName;
		},
	},
});

export const { addProjectCat, deleteProjectCat, editProjectCat } =
	projectCatSlice.actions;

export default projectCatSlice.reducer;
