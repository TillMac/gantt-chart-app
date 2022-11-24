import { configureStore } from '@reduxjs/toolkit';
import projectCatReducer from './projectCatSlice';
import ganttDataSlice from './ganttDataSlice';
import timeViewSlice from './timeViewSlice';
import isLoadingSlice from './isLoadingSlice';

export const store = configureStore({
	reducer: {
		projectCategories: projectCatReducer,
		ganttDataRedux: ganttDataSlice,
		timeView: timeViewSlice,
		LoadingState: isLoadingSlice,
	},
});
