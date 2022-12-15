import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	connection: {
		isAwsPost: true,
		isAwsPut: true,
		isAwsDel: true,
		isGapiPost: true,
		isGapiPatch: true,
		isGapiDel: true,
		isOffline: false,
	},
	isOpen: false,
	isPost: false,
	msg: null,
};

export const popUpBarInfoSlice = createSlice({
	name: 'popUpBarInfo',
	initialState,
	reducers: {
		updatePopUpStatus: (state, action) => {
			const status = action.payload;
			switch (true) {
				case status.hasOwnProperty('isAwsPost'):
					state.connection.isAwsPost = status.isAwsPost;
					state.msg = status.msg;
					state.isOpen = true;
					break;
				case status.hasOwnProperty('isAwsPut'):
					state.connection.isAwsPut = status.isAwsPut;
					state.msg = status.msg;
					state.isOpen = true;
					break;
				case status.hasOwnProperty('isAwsDel'):
					state.connection.isAwsDel = status.isAwsDel;
					state.msg = status.msg;
					state.isOpen = true;
					break;
				case status.hasOwnProperty('isGapiPost'):
					state.connection.isGapiPost = status.isGapiPost;
					state.msg = status.msg;
					state.isOpen = true;
					break;
				case status.hasOwnProperty('isGapiPatch'):
					state.connection.isGapiPatch = status.isGapiPatch;
					state.msg = status.msg;
					state.isOpen = true;
					break;
				case status.hasOwnProperty('isisGapiDel'):
					state.connection.isisGapiDel = status.isisGapiDel;
					state.msg = status.msg;
					state.isOpen = true;
					break;
				case status.hasOwnProperty('isOffline'):
					state.connection.isOffline = status.isOffline;
					state.msg = status.msg;
					state.isOpen = true;
					break;
				default:
					break;
			}
		},
		closePopUpBar: (state) => {
			state.connection.isAwsDel = true;
			state.connection.isAwsPost = true;
			state.connection.isAwsPut = true;
			state.connection.isGapiDel = true;
			state.connection.isGapiPatch = true;
			state.connection.isGapiPost = true;
			state.connection.isOffline = true;
			state.isOpen = false;
			state.position = null;
			state.msg = null;
		},
		postSuccessed: (state, action) => {
			const type = action.payload;
			state.isOpen = true;
			state.isPost = true;
			state.msg = `✅ 成功新增該 ${type}！`;
		},
	},
});

export const { updatePopUpStatus, closePopUpBar, postSuccessed } =
	popUpBarInfoSlice.actions;

export default popUpBarInfoSlice.reducer;
