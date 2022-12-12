// import './App.css';
import { Box, ThemeProvider } from '@mui/material';
import Sidebar from './component/Sidebar/Sidebar';
import Theme from './Theme';
import { Outlet } from 'react-router-dom';
import RequireAuth from './component/Auth';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthenticator } from '@aws-amplify/ui-react';
import {
	addUserData,
	fetchUserData,
	updateUserPhoto,
} from './store/userDataSlice';
import { API } from 'aws-amplify';

function App() {
	const isDataFetchedRef = useRef(false);
	const { user } = useAuthenticator((context) => [context.user]);
	const userData = useSelector((state) => state.userData).userData;
	const dispatch = useDispatch();

	useEffect(() => {
		if (isDataFetchedRef.current) return;
		const fetchData = async () => {
			await dispatch(fetchUserData);
			const username = await user.username;
			if (userData.length === 0) {
				if (username.indexOf('google') === -1) {
					const newUserData = {
						username,
						googleRefreshToken: '',
						photoLink: null,
						email: user.attributes.email,
					};
					dispatch(addUserData(newUserData));
					API.post('usersApi', '/users', {
						body: {
							username: newUserData.username,
							googleRefresh: newUserData.googleRefreshToken,
						},
					});
				} else {
					const newUserData = {
						username: user.attributes.nickname,
						googleRefreshToken: '',
						photoLink: user.attributes.picture,
						email: user.attributes.email,
					};
					dispatch(addUserData(newUserData));
					API.post('usersApi', '/users', {
						body: {
							username: newUserData.username,
							googleRefresh: newUserData.googleRefreshToken,
						},
					});
				}
			} else {
				if (username.indexOf('google') !== -1) {
					const newUserData = {
						photoLink: user.attributes.picture,
						email: user.attributes.email,
					};
					dispatch(updateUserPhoto(newUserData));
				} else {
					const newUserData = {
						photoLink: null,
						email: user.attributes.email,
					};
					dispatch(updateUserPhoto(newUserData));
				}
			}
		};
		fetchData();
		isDataFetchedRef.current = true;
	}, []);

	return (
		<RequireAuth>
			<ThemeProvider theme={Theme}>
				<Box
					sx={{
						display: 'flex',
						backgroundColor: '#F5F6F8',
						height: '100vh',
						width: '100%',
					}}>
					<Sidebar />
					<Box sx={{ width: '100%', overflowX: 'hidden' }}>
						<Outlet />
					</Box>
				</Box>
			</ThemeProvider>
		</RequireAuth>
	);
}

export default App;
