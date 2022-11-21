import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	view: 'Day',
};

export const timeViewSlice = createSlice({
	name: 'timeView',
	initialState,
	reducers: {
		changeView: (state, action) => {
			state.view = action.payload.view;
		},
	},
});

export const { changeView } = timeViewSlice.actions;

export default timeViewSlice.reducer;
