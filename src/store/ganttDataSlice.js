import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';

// const initialState = [
// 	{
// 		projectName: 'Project1',
// 		name: 'Project1',
// 		id: '2377bbcb-40af-46f2-9fdf-81b69b8427b5',
// 		list: [
// 			{
// 				name: 'Project1',
// 				project: 'Project1',
// 				id: 1,
// 				start: new Date(2020, 1, 6),
// 				end: new Date(2020, 1, 10),
// 				progress: 45,
// 				type: 'project',
// 				styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
// 				// displayOrder: 1,
// 			},
// 			{
// 				name: 'Task #1',
// 				project: 'Project1',
// 				id: 2,
// 				start: new Date(2020, 1, 6),
// 				end: new Date(2020, 1, 10),
// 				progress: 45,
// 				type: 'task',
// 				styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
// 				// displayOrder: 2,
// 			},
// 		],
// 	},
// ];

const initialState = {
	loading: false,
	projects: [],
	error: '',
};

export const fetchCatsToGantt = createAsyncThunk(
	'ganttDataRedux/fetchCatsToGantt',
	() => {
		return API.get('projectCatsApi', '/projectcats/name');
	}
);

export const ganttDataSlice = createSlice({
	name: 'ganttDataRedux',
	initialState,
	reducers: {
		addTaskIntoGanttData: (state, action) => {
			const result = state.some(
				(project) => project.name === action.payload.project
			);
			!!result
				? state.forEach((project) => {
						if (project.name === action.payload.project) {
							project.list.push(action.payload);
						}
				  })
				: console.log('project not found.');
		},
		editTaskNameInGanttData: (state, action) => {
			const newTask = action.payload;
			const taskInWhichProject = state.find(
				(projectHere) => projectHere.name === newTask.project
			);
			const projectIndex = state.indexOf(taskInWhichProject);
			state[projectIndex].list.forEach((task) => {
				if (task.id === newTask.id) {
					task.name = newTask.name;
				}
			});
		},
		deleteTaskFromGanttData: (state, action) => {
			const taskInWhichProject = state.find(
				(project) => project.name === action.payload.project
			);
			const projectIndex = state.indexOf(taskInWhichProject);
			const task = state[projectIndex].list.find(
				(task) => task.id === action.payload.id
			);
			const taskIndex = state[projectIndex].list.indexOf(task);
			state[projectIndex].list.splice(taskIndex, 1);
		},
		addProjectIntoGanttData: (state, action) => {
			const result = state.projects.some(
				(project) => project.name === action.payload.name
			);
			!result
				? state.projects.push(action.payload)
				: console.log('this project already exist!');
		},
		editProjectInGanttData: (state, action) => {
			const editedProject = action.payload;
			const project = state.projects.find(
				(project) => project.id === editedProject.id
			);
			const projectIndex = state.projects.indexOf(project);
			state.projects[projectIndex].name = editedProject.name;
			state.projects[projectIndex].linkName = editedProject.linkName;
			if (state.projects[projectIndex].list.length > 0) {
				state.projects[projectIndex].list.forEach((task) => {
					if (task.project !== editedProject.name) {
						task.project = editedProject.name;
					}
				});
			}
		},
		deleteProjectFromGanttData: (state, action) => {
			const project = state.projects.find(
				(project) => project.id === action.payload
			);
			if (project !== undefined) {
				const projectIndex = state.projects.indexOf(project);
				state.projects.splice(projectIndex, 1);
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCatsToGantt.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchCatsToGantt.fulfilled, (state, action) => {
			state.loading = false;
			const fetchedProjectCats = action.payload;
			const newData = fetchedProjectCats.map((cat) => {
				return {
					id: cat.id,
					createdAt: cat.createdAt,
					upatedAt: cat.updatedAt,
					name: cat.name,
					linkName: cat.name,
					list: [],
				};
			});
			for (let cat of newData) {
				state.projects.push(cat);
			}
			state.error = action.payload;
		});
		builder.addCase(fetchCatsToGantt.rejected, (state, action) => {
			state.loading = false;
			state.projects = [];
			state.error = action.payload;
		});
	},
});

export const {
	addTaskIntoGanttData,
	editTaskNameInGanttData,
	deleteTaskFromGanttData,
	addProjectIntoGanttData,
	deleteProjectFromGanttData,
	editProjectInGanttData,
} = ganttDataSlice.actions;
export default ganttDataSlice.reducer;
