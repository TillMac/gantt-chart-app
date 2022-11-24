import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: true,
};

export const listOpenSlice = createSlice({
	name: 'listOpen',
	initialState,
	reducers: {
		openList: (state) => {
			state.status = true;
		},
		closeList: (state) => {
			state.status = false;
		},
	},
});

export const { openList, closeList } = listOpenSlice.actions;

export default listOpenSlice.reducer;
