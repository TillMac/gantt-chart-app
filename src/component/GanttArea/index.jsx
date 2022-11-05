import { Box, Divider } from '@mui/material';
import { Gantt } from 'gantt-task-react';
import { useLoaderData } from 'react-router-dom';
import React from 'react';
import { getGanttData } from '../../functions/getGanttData';

import "gantt-task-react/dist/index.css";

const GanttArea = () => {
  const ganttData = useLoaderData();
  console.log('ganttData from useLoaderData', ganttData);
  return (
    <Box sx={{width: '100%', }}>
      {
        (ganttData[0].list.length !== 0) ? (
          ganttData.map((projects, idx) => {
            return (
              <Box key={idx} sx={{maxWidth: '90%', ml: 'auto', mr: 'auto', }}>
                <h3>{projects.projectName}</h3>
                <Gantt tasks={projects.list} />
                <Divider />
              </Box>
            )
          })) : (
          ganttData.map((projects, idx) => {
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

export default GanttArea;

export const loader = async({ params }) => {
  const projectName = params.name;
  const ganttData = await getGanttData(projectName);
  return ganttData;
};
