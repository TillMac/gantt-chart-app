import { createSlice } from '@reduxjs/toolkit';

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

const initialState = [];

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
		deleteTaskFromGanttData: (state, action) => {
			// const task = action.payload;
			const taskInWhichProject = state.find(
				(project) => project.name === action.payload.project
			);
			const projectIndex = state.indexOf(taskInWhichProject);
			const task = state[projectIndex].list.find(
				(task) => task.id === action.payload.id
			);
			const taskIndex = state[projectIndex].list.indexOf(task);
			state[projectIndex].list.splice(taskIndex, 1);
			// state[projectIndex].list.splice()
		},
		addProjectIntoGanttData: (state, action) => {
			const result = state.some(
				(project) => project.name === action.payload.name
			);
			!result
				? state.push(action.payload)
				: console.log('this project already exist!');
		},
		deleteProjectFromGanttData: (state, action) => {
			const project = state.find((project) => project.id === action.payload);
			if (project !== undefined) {
				const projectIndex = state.indexOf(project);
				state.splice(projectIndex, 1);
			}
		},
	},
});

export const {
	addTaskIntoGanttData,
	deleteTaskFromGanttData,
	addProjectIntoGanttData,
	deleteProjectFromGanttData,
} = ganttDataSlice.actions;
export default ganttDataSlice.reducer;
