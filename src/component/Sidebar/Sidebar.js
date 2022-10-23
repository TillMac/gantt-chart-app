import { AccountCircle,  Folder, Inbox } from "@mui/icons-material";
import { Box, Container, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import CreateListItem from "./CreateListItem/CreateListItem";

const drawerWidth = 240;

const Sidebar = ({ ganttData, setGanttData }) => {
  const [clickCreate, setClickCreate] = useState(false);  

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{
        width: '100%',
        height: '100vh',
        background: (theme) => theme.palette.secondary.main,
      }}>
        <Container sx={{width: '100%', display: 'flex', mt:9.5, mb:4.75, pl: '0px !important', pr: '0px !important', boxSizing: 'border-box'}}>
          <AccountCircle
            sx={{fontSize: '48px', mt: 'auto', mb: 'auto', ml: 4.5}}
          />
          <p style={{fontSize: '24px', marginLeft: '20px'}}>Jennifer</p>
        </Container>
        <Link to={'/' } style={{textDecoration: 'none', color: 'inherit'}}>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="總覽" />
              </ListItemButton>
            </ListItem>
          </List>
        </Link>
        {ganttData.length !== 0
          ? 
            <>
              <List sx={{
                height: 192,
                overflowY: 'auto',
              }}>
                {ganttData.map((project) => {
                  return (
                  <Link to={`/projects/${project.name}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <ListItem key={project.id}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Folder/>
                        </ListItemIcon>
                        <ListItemText primary={project.projectName} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                )})}
              </List>
              <Divider />
              <CreateListItem clickCreate={clickCreate} setClickCreate={setClickCreate} ganttData={ganttData} setGanttData={setGanttData} />
            </>
          :
            <>
              <Divider />
              <CreateListItem clickCreate={clickCreate} setClickCreate={setClickCreate} ganttData={ganttData} setGanttData={setGanttData} />
            </>
        }
      </Box>
    </Drawer>
  )
}

export default Sidebar;
