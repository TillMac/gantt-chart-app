import { AccountCircleOutlined, Add, Cancel } from '@mui/icons-material';
import {
	Box,
	Divider,
	FormControl,
	FormControlLabel,
	FormGroup,
	IconButton,
	Input,
	InputLabel,
	ListItem,
	Switch,
	Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName } from '../store/userDataSlice';
import { API } from 'aws-amplify';

const Setting = () => {
	const userData = useSelector((state) => state.userData).userData;
	const [isChangeName, setIsChangeName] = useState(false);
	const [newUsername, setNewUsername] = useState('');
	const dispatch = useDispatch();

	const changeUsernameHandler = (e) => {
		e.preventDefault();
		const noSpaceNewUsername = newUsername.trim();
		dispatch(updateUserName(noSpaceNewUsername));
		API.put('usersApi', '/users/userId', {
			body: {
				username: noSpaceNewUsername,
			},
		});
		setIsChangeName(false);
	};

	return (
		<Box sx={{ width: '40%', height: '100vh', ml: 'auto', mr: 'auto' }}>
			<Box sx={{ width: '100%' }}>
				<Typography
					variant='h3'
					sx={{ fontSize: '2rem', pt: 8, fontWeight: 400 }}>
					詳細資料
				</Typography>
				<Box sx={{ width: '100%', display: 'flex' }}>
					{userData[0].photoLink === null ? (
						<AccountCircleOutlined
							sx={{
								width: '128px',
								height: '128px',
								ml: 'auto',
								mr: 'auto',
								mt: 8,
							}}
						/>
					) : (
						<img
							src={userData[0].photoLink}
							alt='user icon'
							style={{
								width: '128px',
								height: '128px',
								borderRadius: '50%',
								marginTop: '64px',
								marginLeft: 'auto',
								marginRight: 'auto',
							}}
						/>
					)}
				</Box>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						mt: 4,
					}}>
					{isChangeName === false ? (
						<>
							<Typography
								variant='h4'
								sx={{
									fontSize: '1.5rem',
									mt: 'auto',
									mb: 'auto',
								}}>
								{userData[0].username}
							</Typography>
							<IconButton
								sx={{ mt: 'auto', mb: 'auto', display: 'flex' }}
								onClick={() => setIsChangeName(true)}>
								<EditIcon />
							</IconButton>
						</>
					) : (
						<>
							<form
								style={{ display: 'flex', margin: 'auto' }}
								onSubmit={changeUsernameHandler}>
								<FormControl sx={{ maxWidth: '200px', mr: 1.25 }}>
									<InputLabel htmlFor='component-outlined'>
										更改用戶名稱
									</InputLabel>
									<Input
										id='component-outlined'
										label='用戶名稱'
										placeholder={userData[0].username}
										onChange={(e) => setNewUsername(e.target.value)}
										autoFocus={true}
									/>
								</FormControl>
								<ListItem sx={{ pl: 0, pr: 0, maxWidth: '60px' }}>
									<IconButton size='small' type='submit'>
										<Add />
									</IconButton>
									<IconButton
										size='small'
										onClick={() => setIsChangeName(false)}>
										<Cancel />
									</IconButton>
								</ListItem>
							</form>
						</>
					)}
				</Box>
				<Typography
					variant='h4'
					sx={{
						width: '100%',
						fontSize: '1.25rem',
						textAlign: 'center',
						mt: 4,
					}}>
					{`Email: ${userData[0].email}`}
				</Typography>
			</Box>
			<Divider sx={{ mt: 4, mb: 4 }} />
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
				}}>
				<Typography variant='h4' sx={{ fontSize: '1.5rem', fontWeight: 400 }}>
					開通 Google Calendar 連動服務
				</Typography>
				{userData[0].photoLink === null ? (
					<Typography
						variant='body1'
						color={(theme) => theme.palette.other.text}
						sx={{ ml: 'auto' }}>
						僅限 Google 登入用戶使用
					</Typography>
				) : (
					<FormGroup sx={{ ml: 'auto' }}>
						<FormControlLabel
							control={
								<Switch
									sx={{
										'& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
											backgroundColor: (theme) => theme.palette.other.btn,
										},
									}}
								/>
							}
						/>
					</FormGroup>
				)}
				<Box sx={{ width: '100%', display: 'block', pl: '24px', pt: '12px' }}>
					<Typography
						variant='body1'
						sx={{ width: '100%' }}
						color={(theme) => theme.palette.other.text}>
						開啟「Google Calendar
						連動服務」可以使各專案底下的每個事項、里程碑標記於「Gantt」日曆底下，好讓您可以藉由
						Google Calendar
						服務了解近期有哪些事項要開始、結束，進而更好地追蹤專案時程。
					</Typography>
					<Typography
						variant='body1'
						sx={{ width: '100%', pt: '12px' }}
						color={(theme) => theme.palette.other.text}>
						📌 此功能目前僅開放使用 Google
						帳戶登入的朋友；若一般註冊登入的朋友想體驗「Google Calendar
						連動服務」功能，建議您將現有帳戶登出並使用 Google
						帳戶重新登入，請見諒！
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default Setting;
