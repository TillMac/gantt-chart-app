import './App.css';
import { Box, ThemeProvider } from '@mui/material';
import Sidebar from './component/Sidebar';
import InputArea from './component/InputArea';
import GanttArea from './component/GanttArea';
import Theme from './Theme';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{
        display: 'flex',
        backgroundColor: '#F5F6F8',
        height: '100vh',
        width: '100%',
      }}>
        <Sidebar />
        <Box sx={{width: '100%',}}>
          <InputArea />
          <GanttArea />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
