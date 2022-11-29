import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';

const initialState = {
	loading: false,
	cats: [],
	error: '',
};

export const fetchCats = createAsyncThunk('projectCategories/fetchCats', () => {
	return API.get('projectCatsApi', '/projectcats/userId');
});

export const projectCatSlice = createSlice({
	name: 'projectCategories',
	initialState,
	reducers: {
		addProjectCat: (state, action) => {
			state.cats.push(action.payload);
		},
		deleteProjectCat: (state, action) => {
			const project = state.cats.find(
				(project) => project.id === action.payload
			);
			if (project !== undefined) {
				const projectIndex = state.cats.indexOf(project);
				state.cats.splice(projectIndex, 1);
			}
		},
		editProjectCat: (state, action) => {
			const editedProject = action.payload;
			const project = state.cats.find(
				(project) => project.id === editedProject.id
			);
			const projectIndex = state.cats.indexOf(project);
			console.log(projectIndex, 'projectIndex from edit');
			state.cats[projectIndex].name = editedProject.name;
			state.cats[projectIndex].linkName = editedProject.linkName;
			state.cats[projectIndex].updatedAt = editedProject.updatedAt;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCats.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchCats.fulfilled, (state, action) => {
			state.loading = false;
			console.log(action.payload, 'action.payment');
			const fetchedProjectCats = action.payload;
			const newData = fetchedProjectCats.map((cat) => {
				return {
					id: cat.id,
					createdAt: cat.createdAt,
					upatedAt: cat.updatedAt,
					name: cat.name,
					linkName: cat.name,
				};
			});
			console.log('newData', newData);
			for (let cat of newData) {
				state.cats.push(cat);
			}
			state.error = '';
		});
		builder.addCase(fetchCats.rejected, (state, action) => {
			state.loading = false;
			state.cats = [];
			state.error = action.payload;
		});
	},
});

export const {
	addProjectCat,
	deleteProjectCat,
	editProjectCat,
	updateProjectCatFromApi,
} = projectCatSlice.actions;

export default projectCatSlice.reducer;
