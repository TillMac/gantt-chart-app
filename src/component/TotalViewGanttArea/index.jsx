import { Box, Divider } from '@mui/material';
import { Gantt } from 'gantt-task-react';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { getTotalGanttData } from '../../functions/getGanttData';

const TotalViewGanttArea = () => {
  const totalViewGanttData = useLoaderData();
  return (
    <Box sx={{width: '100%', }}>
      {
        (totalViewGanttData[0].list.length !== 0) ? (
          totalViewGanttData.map((projects, idx) => {
            return (
              <Box key={idx} sx={{maxWidth: '90%', ml: 'auto', mr: 'auto', }}>
                <h3>{projects.projectName}</h3>
                <Gantt tasks={projects.list} />
                <Divider />
              </Box>
            )
          })) : (
            totalViewGanttData.map((projects, idx) => {
            return (
              <Box key={idx} sx={{maxWidth: '90%', ml: 'auto', mr: 'auto', }}>
                <h3>{projects.projectName}</h3>
                <p>Sorry, no data here!</p>
                <Divider />
              </Box>
            )
          }))
      }
    </Box>
  )
}

export default TotalViewGanttArea;


export const loader = async() => {
  const ganttData = await getTotalGanttData();
  return ganttData;
};
