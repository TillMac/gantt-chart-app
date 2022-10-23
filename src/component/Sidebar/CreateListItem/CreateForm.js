import { Add, Cancel, } from "@mui/icons-material";
import { List, FormControl, InputLabel, ListItem, IconButton, Input, } from "@mui/material";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

const CreateForm = ({ clickCreate, setClickCreate, ganttData, setGanttData }) => {
  const cancelCreateHandler = () => setClickCreate(!clickCreate);

  const inputProjectRef = useRef('nani');

  const createProjectHandler = (e) => {
    e.preventDefault();
    setGanttData((prevGanttData) => [
      ...prevGanttData,
      {
        projectName: inputProjectRef.current.value.trim(),
        name: inputProjectRef.current.value.replace(/\s*/g,""),
        id: uuidv4(),
        list: [],
      }
    ])
    console.log('ganttData', ganttData);
  };

  useEffect(() => {
    localStorage.setItem("ganttDatas", JSON.stringify(ganttData));
  }, [ganttData]);

  return (
    <List sx={{display: 'flex', mt: 1.5}}>
      <form style={{display: 'flex', margin: 'auto' }} onSubmit={createProjectHandler}>
        <FormControl sx={{maxWidth: '120px', mr: 1.25,}}>
          <InputLabel htmlFor="component-outlined">新專案名稱</InputLabel>
          <Input
            id="component-outlined"
            label="新事項名稱"
            placeholder="輸入新事項名稱..."
            inputRef={inputProjectRef}
          />
        </FormControl>
        <ListItem sx={{pl: 0, pr: 0, maxWidth: '60px'}}>
          <IconButton size='small' type='submit'>
            <Add />
          </IconButton>
          <IconButton size='small' onClick={cancelCreateHandler}>
            <Cancel />
          </IconButton>
        </ListItem>
      </form>
    </List>
  )
}

export default CreateForm;
