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
			const removeProjectId = action.payload.id;
			state = state.filter((project) => {
				return project.id !== removeProjectId;
			});
		},
		editProjectCat: (state, action) => {
			const project = state.find((project) => project.id === action.payload.id);
			if (project !== undefined) {
				const projectIndex = state.indexOf(project);
				state.splice(projectIndex, 1, action.payload);
			}
		},
	},
});

export const { addProjectCat, deleteProjectCat, editProjectCat } =
	projectCatSlice.actions;

export default projectCatSlice.reducer;
