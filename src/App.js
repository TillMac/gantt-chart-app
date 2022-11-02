import './App.css';
import { Box, ThemeProvider } from '@mui/material';
import Sidebar from './component/Sidebar/Sidebar';
import InputArea from './component/InputArea';
import Theme from './Theme';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const [ganttData, setGanttData] = useState(() => {
    let ganttDatas = localStorage.getItem("ganttDatas");
    let ganttData = JSON.parse(ganttDatas);
    if (ganttData) {
      return ganttData;
    } else {
      return [];
    }
  });

  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{
        display: 'flex',
        backgroundColor: '#F5F6F8',
        height: '100vh',
        width: '100%',
      }}>
        <Sidebar ganttData={ganttData} setGanttData={setGanttData} />
        <Box sx={{width: '100%', overflowX: 'hidden'}}>
          <InputArea ganttData={ganttData} setGanttData={setGanttData} />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
