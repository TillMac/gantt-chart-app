// import './App.css';
import { Box, ThemeProvider } from '@mui/material';
import Sidebar from './component/Sidebar/Sidebar';
import InputArea from './component/InputArea';
import Theme from './Theme';
import { Outlet } from 'react-router-dom';
import RequireAuth from './component/Auth';

function App() {
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
						<InputArea />
						<Outlet />
					</Box>
				</Box>
			</ThemeProvider>
		</RequireAuth>
	);
}

export default App;
