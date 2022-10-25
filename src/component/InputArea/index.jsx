import { Box, FormControl, InputLabel, OutlinedInput, Select, MenuItem, Stack, TextField, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { v4 as uuidv4 } from 'uuid';

import { useState } from "react";

const InputArea = ({ ganttData, setGanttData }) => {
  const [startDate, setStartDate] = useState([null, null]);
  const [deadline, setDeadline] = useState([null, null]);
  const [taskData, setTaskData] = useState({
    id: null,
    name: '',
    project: '',
    type: '',
    start: null,
    end: null,
    progress: 0,
  });

  const taskNameHandler = (e) => {
    setTaskData({
      ...taskData,
      id: uuidv4,
      name: e.target.value,
      progress: 0,
    })
  }

  const projectNameHandler = (e) => {
    setTaskData({
      ...taskData,
      project: e.target.value,
    })
  };

  const taskTypeHandler = (e) => {
    setTaskData({
      ...taskData,
      type: e.target.value,
    })
  };

  // const startDateHandler = (e) => {
  //   setTaskData({
  //     ...taskData,
  //     start: e.target.value,
  //   })
  // };

  // const deadlineHandler = (e) => {
  //   setTaskData({
  //     ...taskData,
  //     end: e.target.value,
  //   })
  // };

  // 嘗試 將 taskData 結合至對應的 ganttData object 中，此為嘗試一
  // const addProjectTaskHandler = (e) => {
  //   e.preventDefault();
  //   const result = ganttData.findIndex((project) => project.name === taskData.project);
  //   // ? ganttData[result].list.push(taskData)
  //   if (result !== null || result !== undefined) {
  //     setGanttData((prevGanttData) => [
  //       ...prevGanttData].map(projects => {
  //         if (projects.name === taskData.project) {
  //           return {
  //           ...projects,
  //           list: (prevList) => [
  //             ...prevList,
  //             taskData,
  //           ]
  //         }
  //         } else return projects;
  //       })
  //     );
  //     console.log('ganttData', ganttData);
  //     setTaskData({
  //       id: null,
  //       name: '',
  //       project: '',
  //       type: '',
  //       start: null,
  //       end: null,
  //       progress: 0,
  //     });
  //   } else {
  //     console.log('something went wrong', taskData);
  //     console.log('something went wrong', ganttData);
  //   }
  // };

  // 嘗試 將 taskData 結合至對應的 ganttData object 中，嘗試二
  const addProjectTaskHandler = (e) => {
    e.preventDefault();
    console.log('taskData', taskData);
    if (ganttData.map(project => project.name === taskData.project)) {
      setGanttData((prevGanttData) => [
        ...prevGanttData].map(projects => {
          if (projects.name === taskData.project) {
            return {
            ...projects,
            list: (prevList) => [
              ...prevList,
              taskData,
            ]
          }
          } else return projects;
        })
      );
      console.log('ganttData', ganttData);
      setTaskData({
        id: null,
        name: '',
        project: '',
        type: '',
        start: null,
        end: null,
        progress: 0,
      });
    } else {
      console.log('something went wrong', taskData);
      console.log('something went wrong', ganttData);
    }  
  };

  return (
    <Box
      sx={{width: '100%', display: 'flex',}}
    >
      <Box sx={{
        width: '90%',
        height: 180,
        display: 'flex',
        backgroundColor: 'white',
        mt: 2.5,
        mb: 2.5,
        mr: 'auto',
        ml: 'auto',
        borderRadius: 2,
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
      }}>
        <form onSubmit={addProjectTaskHandler} style={{display: 'flex', margin: 'auto', position: 'relative', maxWidth: '867px', flexWrap: 'wrap',}}>
          <Stack direction='row' spacing={2.5} sx={{position: 'relative'}}>
            <FormControl sx={{minWidth: '150px',}}>
              <InputLabel htmlFor="component-outlined">Task Name</InputLabel>
              <OutlinedInput
                id="component-outlined"
                label="Task Name"
                placeholder="輸入事項名稱..."
                onChange={taskNameHandler}
              />
            </FormControl>
            <FormControl sx={{minWidth: '150px',}}>
              <InputLabel>Project Name</InputLabel>
              <Select
                label="Project Name"
                onChange={projectNameHandler}
              >
                {
                  ganttData.map((projects) => {
                    return (
                      <MenuItem value={projects.name} key={projects.name} >{projects.projectName}</MenuItem>
                    )
                  })
                }
                {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
            <FormControl sx={{minWidth: '150px',}}>
              <InputLabel>Task Type</InputLabel>
              <Select
                label="Task Type"
                placeholder="輸入事項樣式..."
                onChange={taskTypeHandler}
              >
                <MenuItem value={'task'}>Task</MenuItem>
                <MenuItem value={'milestone'}>Milestone</MenuItem>
              </Select>
            </FormControl>
            <div style={{maxWidth: '150px'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  setTaskData(
                    {
                      ...taskData,
                      start: startDate.$d,
                    }
                  )
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            </div>
            <div style={{maxWidth: '150px'}} >
            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{maxWidth: '120px'}} >
              <DatePicker
                label="Deadline"
                value={deadline}
                onChange={(newValue) => {
                  setDeadline(newValue);
                  setTaskData(
                    {
                      ...taskData,
                      end: deadline.$d,
                    }
                  );
                  console.log('newValue', deadline)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            </div>
          </Stack>
          <Button
            size='large'
            type='submit'
            sx={{
              maxWidth: '150px',
              marginLeft: 'auto',
              mt: 2,
              backgroundColor: (theme) => theme.palette.other.btn,
              color: (theme) => theme.palette.other.white,
            }}
          >
            新增事項
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default InputArea;
