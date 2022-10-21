import { AccountCircle, AddBox, Folder, Inbox } from "@mui/icons-material";
import { Box, Container, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const drawerWidth = 240;

const projectList = [
  // {
  //   name: '專案 #1',
  //   id: 1,
  // },
  // {
  //   name: '專案 #2',
  //   id: 2,
  // },
  // {
  //   name: '專案 #3',
  //   id: 3,
  // },
  // {
  //   name: '專案 #4',
  //   id: 4,
  // },
  // {
  //   name: '專案 #5',
  //   id: 5,
  // },
  // {
  //   name: '專案 #6',
  //   id: 6,
  // },
  // {
  //   name: '專案 #7',
  //   id: 7,
  // },
];

const Sidebar = () => {
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
        {projectList.length !== 0 ?
          <>
            <List sx={{
              height: 192,
              overflowY: 'auto',
            }}>
              {projectList.map((project) => {
                return (
                <ListItem key={project.id}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Folder/>
                    </ListItemIcon>
                    <ListItemText primary={project.name} />
                  </ListItemButton>
                </ListItem>
              )})}
            </List>
            <Divider />
            <List>
            <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <AddBox />
                  </ListItemIcon>
                  <ListItemText primary="新增專案" />
                </ListItemButton>
              </ListItem>
            </List>
          </>
          :
            <>
              <Divider />
              <List>
              <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <AddBox />
                    </ListItemIcon>
                    <ListItemText primary="新增專案" />
                  </ListItemButton>
                </ListItem>
              </List>
            </>
        }
      </Box>
    </Drawer>
  )
}

export default Sidebar;
