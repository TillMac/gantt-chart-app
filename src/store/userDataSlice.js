import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';

const initialState = {
	isLoading: false,
	userData: [],
	error: {
		status: false,
		msg: '',
	},
};

export const fetchUserData = createAsyncThunk('userData/fetchUserData', () => {
	return API.get('usersApi', '/users/userId');
});

export const userDataSlice = createSlice({
	name: 'userData',
	initialState,
	reducers: {
		addUserData: (state, action) => {
			const newUserData = action.payload;
			state.userData.push(newUserData);
		},
		updateUserName: (state, action) => {
			const newUsername = action.payload;
			const updatedTime = new Date().toJSON();
			state.userData[0].username = newUsername;
			state.userData[0].updatedAt = updatedTime;
		},
		updateUserPhoto: (state, action) => {
			const newPhoto = action.payload.photoLink;
			state.userData[0].photo = newPhoto;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserData.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchUserData.fulfilled, (state, action) => {
			state.isLoading = false;
			const fetchedUserData = action.payload;
			state.userData.push(fetchedUserData);
		});
		builder.addCase(fetchUserData.rejected, (state, action) => {
			state.isLoading = false;
			state.error.status = true;
			state.error.msg = action.payload;
		});
	},
});

export const { updateUserName, addUserData, updateUserPhoto } =
	userDataSlice.actions;

export default userDataSlice.reducer;
