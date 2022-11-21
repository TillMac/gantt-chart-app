import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { AddBoxOutlined } from '@mui/icons-material';

const CreateBtn = ({ clickCreate, setClickCreate }) => {
	const clickCreateHandler = () => {
		setClickCreate(!clickCreate);
	};

	return (
		<List>
			<ListItem>
				<ListItemButton
					onClick={clickCreateHandler}
					sx={{
						backgroundColor: (theme) => theme.palette.other.btn,
						borderRadius: 2,
						'&.MuiButtonBase-root:hover': {
							backgroundColor: '#5D5FEF !important',
						},
					}}>
					<ListItemIcon>
						<AddBoxOutlined
							sx={{ color: (theme) => theme.palette.other.white }}
						/>
					</ListItemIcon>
					<ListItemText
						primary='新增專案'
						sx={{ color: (theme) => theme.palette.other.white }}
					/>
				</ListItemButton>
			</ListItem>
		</List>
	);
};

export default CreateBtn;
