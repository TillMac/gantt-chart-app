import './App.css';
import { Box, ThemeProvider } from '@mui/material';
import Sidebar from './component/Sidebar';
import InputArea from './component/InputArea';
import GanttArea from './component/GanttArea';
import Theme from './Theme';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ display: 'flex', backgroundColor: '#F5F6F8', height: '100vh'}}>
        <Sidebar />
        <Box>
          <InputArea />
          <GanttArea />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
