import { createSlice } from '@reduxjs/toolkit';

const initialState = true;

export const isLoadingSlice = createSlice({
	name: 'LoadingState',
	initialState,
	reducers: {
		isLoading: (state, action) => ({
			state: action.payload,
		}),
		isLoaded: (state, action) => ({
			state: action.payload,
		}),
	},
});

export const { isLoading, isLoaded } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
