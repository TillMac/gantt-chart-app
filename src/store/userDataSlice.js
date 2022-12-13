import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';

const initialState = {
	isLoading: false,
	userData: [],
	error: {
		status: false,
		msg: '',
	},
	isFetched: false,
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
		updateUserInfo: (state, action) => {
			const updateInfo = action.payload;
			if (updateInfo.hasOwnProperty('photoLink')) {
				state.userData[0].photoLink = updateInfo.photoLink;
			}
			if (updateInfo.hasOwnProperty('email')) {
				state.userData[0].email = updateInfo.email;
			}
			if (updateInfo.hasOwnProperty('accessToken')) {
				state.userData[0].accessToken = updateInfo.accessToken;
			}
			if (updateInfo.hasOwnProperty('expireIn')) {
				const expireIn = Number(updateInfo.expireIn) * 1000;
				const nowTimeStamp = new Date().getTime();
				state.userData[0].expiryDate = nowTimeStamp + expireIn;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserData.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchUserData.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isFetched = true;
			const fetchedUserData = action.payload[0];
			fetchedUserData.photoLink = null;
			state.userData.push(fetchedUserData);
		});
		builder.addCase(fetchUserData.rejected, (state, action) => {
			state.isLoading = false;
			state.error.status = true;
			state.error.msg = action.payload;
		});
	},
});

export const { updateUserName, addUserData, updateUserInfo } =
	userDataSlice.actions;

export default userDataSlice.reducer;
