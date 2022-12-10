import { configureStore } from '@reduxjs/toolkit';
import projectCatReducer from './projectCatSlice';
import ganttDataSlice from './ganttDataSlice';
import timeViewSlice from './timeViewSlice';
import listOpenSlice from './listOpenSlice';
import userDataSlice from './userDataSlice';

export const store = configureStore({
	reducer: {
		projectCategories: projectCatReducer,
		ganttDataRedux: ganttDataSlice,
		timeView: timeViewSlice,
		listOpen: listOpenSlice,
		userData: userDataSlice,
	},
});
