import { Box, FormControl, InputLabel, OutlinedInput, Select, MenuItem, Stack, TextField, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useState } from "react";

const InputArea = () => {
  const [value, setValue] = useState([null, null]);

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
        <form style={{display: 'flex', margin: 'auto', position: 'relative', maxWidth: '867px', flexWrap: 'wrap',}}>
          <Stack direction='row' spacing={2.5} sx={{position: 'relative'}}>
            <FormControl sx={{minWidth: '150px',}}>
              <InputLabel htmlFor="component-outlined">事項名稱</InputLabel>
              <OutlinedInput
                id="component-outlined"
                label="事項名稱"
                placeholder="輸入事項名稱..."
              />
            </FormControl>
            <FormControl sx={{minWidth: '150px',}}>
              <InputLabel>Age</InputLabel>
              <Select
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="開始日期"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="截止日期"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
          <Button
            size='large'
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
