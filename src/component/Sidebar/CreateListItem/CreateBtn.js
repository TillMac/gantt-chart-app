import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { AddBox } from "@mui/icons-material";

const CreateBtn = ({ clickCreate, setClickCreate}) => {
  const clickCreateHandler = () => {
    setClickCreate(!clickCreate);
  };

  return (
    <List>
      <ListItem>
        <ListItemButton onClick={clickCreateHandler}>
          <ListItemIcon>
            <AddBox />
          </ListItemIcon>
          <ListItemText primary="新增專案" />
        </ListItemButton>
      </ListItem>
    </List>
  )
}

export default CreateBtn;
