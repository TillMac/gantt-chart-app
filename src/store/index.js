import { configureStore } from '@reduxjs/toolkit';
import projectCatReducer from './projectCatSlice';
import ganttDataSlice from './ganttDataSlice';

export const store = configureStore({
	reducer: {
		projectCategories: projectCatReducer,
		ganttDataRedux: ganttDataSlice,
	},
});
