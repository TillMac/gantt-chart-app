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
	loadingStatus: {
		cats: false,
		tasks: true,
	},
	projects: [],
	error: {
		status: {
			cats: false,
			tasks: false,
		},
		msg: '',
	},
};

export const fetchCatsToGantt = createAsyncThunk(
	'ganttDataRedux/fetchCatsToGantt',
	() => {
		return API.get('projectCatsApi', '/projectcats/userId');
	}
);

export const fetchTasksToGantt = createAsyncThunk(
	'ganttDataRedux/fetchTasksToGant',
	() => {
		return API.get('ganttTasksApi', '/gantttasks/userId');
	}
);

export const ganttDataSlice = createSlice({
	name: 'ganttDataRedux',
	initialState,
	reducers: {
		addTaskIntoGanttData: (state, action) => {
			const result = state.projects.some(
				(project) => project.id === action.payload.projectId
			);
			!!result
				? state.projects.forEach((project) => {
						if (project.id === action.payload.projectId) {
							action.payload.project = action.payload.projectId;
							project.list.push(action.payload);
						}
				  })
				: console.log('project not found.');
		},
		editTaskNameInGanttData: (state, action) => {
			const newTask = action.payload;
			const taskInWhichProject = state.projects.find(
				(projectHere) => projectHere.id === newTask.projectId
			);
			const task = taskInWhichProject.list.find(
				(task) => task.id === newTask.id
			);
			task.name = newTask.name;
		},
		deleteTaskFromGanttData: (state, action) => {
			const taskInWhichProject = state.projects.find(
				(project) => project.id === action.payload.projectId
			);
			const projectIndex = state.projects.indexOf(taskInWhichProject);
			const task = state.projects[projectIndex].list.find(
				(task) => task.id === action.payload.id
			);
			const taskIndex = state.projects[projectIndex].list.indexOf(task);
			state.projects[projectIndex].list.splice(taskIndex, 1);
		},
		addProjectIntoGanttData: (state, action) => {
			const result = state.projects.some(
				(project) => project.id === action.payload.id
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
			state.loadingStatus.cats = true;
		});
		builder.addCase(fetchCatsToGantt.fulfilled, (state, action) => {
			state.loadingStatus.cats = false;
			const fetchedProjectCats = action.payload;
			const newData = fetchedProjectCats.map((cat) => {
				return {
					id: cat.id,
					createdAt: cat.createdAt,
					upatedAt: cat.updatedAt,
					name: cat.name,
					linkName: cat.name.replace(/\s*/g, ''),
					list: [],
				};
			});
			for (let cat of newData) {
				state.projects.push(cat);
			}
			state.error.msg = '';
		});
		builder.addCase(fetchCatsToGantt.rejected, (state, action) => {
			state.loadingStatus.cats = false;
			state.projects = [];
			state.error.status.cats = true;
			state.error.msg = action.payload;
		});
		builder.addCase(fetchTasksToGantt.pending, (state) => {
			state.loadingStatus.tasks = true;
		});
		builder.addCase(fetchTasksToGantt.fulfilled, (state, action) => {
			state.loadingStatus.tasks = false;
			const fetchedGanttTasks = action.payload;
			state.projects.forEach((project) => {
				fetchedGanttTasks.forEach((task) => {
					if (project.id === task.projectId) {
						task.project = task.projectId;
						project.list.push(task);
					}
				});
			});
		});
		builder.addCase(fetchTasksToGantt.rejected, (state, action) => {
			state.loadingStatus.tasks = false;
			state.error.status.tasks = true;
			state.error.msg = action.payload;
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
