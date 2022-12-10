import { AccountCircleOutlined } from '@mui/icons-material';
import {
	Box,
	Divider,
	FormControlLabel,
	FormGroup,
	Switch,
	Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Setting = () => {
	const userData = useSelector((state) => state.userData).userData;
	const dispatch = useDispatch();

	return (
		<Box sx={{ width: '60%', height: '100vh', ml: 'auto', mr: 'auto' }}>
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
				<Typography
					variant='h4'
					sx={{
						width: '100%',
						fontSize: '1.5rem',
						textAlign: 'center',
						mt: 4,
					}}>
					{userData[0].username}
				</Typography>
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
						📌 提醒使用 Google 帳戶登入的朋友：礙於登入驗證程序與 Google
						Calendar 驗證為不同驗證方式，因此還請您再次登入、驗證好使用「Google
						Calendar 連動服務」，請見諒！
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default Setting;
