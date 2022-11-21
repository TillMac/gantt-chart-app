import { Box, Button } from '@mui/material';
import { Link, useRouteError } from 'react-router-dom';

const errorImg = require('../../assets/404_Error_bgImg.png');

const ErrorPage = () => {
	const error = useRouteError();

	return (
		<Box
			sx={{
				width: '100%',
				textAlign: 'center',
			}}>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					width: '100%',
					height: '100vh',
					margin: 'auto',
				}}>
				<Box
					sx={{
						margin: 'auto',
						width: {
							xs: 300,
							sm: 350,
							md: 400,
							lg: 500,
							xl: 650,
						},
					}}>
					<img src={errorImg} alt='404 Error' style={{ width: '100%' }} />
				</Box>
				<Box sx={{ marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
					<p style={{ fontSize: '24px' }}>
						Oops...Page <i>{error.statusText || error.message}!</i>
					</p>
					<Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
						<Button size='large'>點擊我回到主頁</Button>
					</Link>
				</Box>
			</div>
		</Box>
	);
};

export default ErrorPage;
