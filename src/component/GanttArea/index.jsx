import { Box, Divider } from '@mui/material';
import { Gantt } from 'gantt-task-react';
import React from 'react'

import "gantt-task-react/dist/index.css";

const testData = [
  {
    projectName: 'Project #1',
    list: [
      {
      name: 'Project #1',
      project: 'project#1',
      id: 1,
      start: new Date(2020, 1, 6),
      end: new Date(2020, 1, 10),
      progress: 45,
      type: "project",
      styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
      // displayOrder: 1,
    },
    {
      name: 'Task #1',
      project: 'project#1',
      id: 1,
      start: new Date(2020, 1, 6),
      end: new Date(2020, 1, 10),
      progress: 45,
      type: "task",
      styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
      // displayOrder: 2,
    },
    {
      name: 'Task #2',
      project: 'project#1',
      id: 1,
      start: new Date(2020, 1, 6),
      end: new Date(2020, 1, 10),
      progress: 45,
      type: "task",
      styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
      // displayOrder: 3,
    },
    ],
  },
  {
    projectName: 'Project #2',
    list: [
      {
      name: 'Project #1',
      project: 'project#2',
      id: 1,
      start: new Date(2020, 1, 6),
      end: new Date(2020, 1, 10),
      progress: 45,
      type: "project",
      styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
      // displayOrder: 1,
    },
    {
      name: 'Task #1',
      project: 'project#2',
      id: 1,
      start: new Date(2020, 1, 6),
      end: new Date(2020, 1, 10),
      progress: 45,
      type: "task",
      styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
      // displayOrder: 2,
    },
    {
      name: 'Task #2',
      project: 'project#2',
      id: 1,
      start: new Date(2020, 1, 6),
      end: new Date(2020, 1, 10),
      progress: 45,
      type: "task",
      styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
      // displayOrder: 3,
    },
    ],
  },
  {
    projectName: 'Project #3',
    list: [
      {
        name: 'Project #3',
        project: 'project#3',
        id: 1,
        start: new Date(2020, 1, 6),
        end: new Date(2020, 1, 10),
        progress: 45,
        type: "project",
        styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
        // displayOrder: 1,
      },
      {
        name: 'Task #1',
        project: 'project#3',
        id: 1,
        start: new Date(2020, 1, 6),
        end: new Date(2020, 1, 10),
        progress: 45,
        type: "task",
        styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
        // displayOrder: 2,
      },
      {
        name: 'Task #2',
        project: 'project#3',
        id: 1,
        start: new Date(2020, 1, 6),
        end: new Date(2020, 1, 10),
        progress: 45,
        type: "task",
        styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
        // displayOrder: 3,
      },
    ]
  }
]

const GanttArea = () => {
  return (
    <Box sx={{width: '100%', }}>
      {
        testData.map((projects, idx) => {
          return (
            <Box key={idx} sx={{maxWidth: '90%', ml: 'auto', mr: 'auto', }}>
              <h3>{projects.projectName}</h3>
              <Gantt tasks={projects.list} />
              <Divider />
            </Box>
          )
        })
      }
    </Box>
  )
}

export default GanttArea;
