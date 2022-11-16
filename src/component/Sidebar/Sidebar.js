import { AccountCircle, Folder, Inbox } from '@mui/icons-material';
import {
	Box,
	Container,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteButton from './ChangeList/DeleteButton';
import { EditButton } from './ChangeList/EditButton';
import CreateListItem from './CreateListItem/CreateListItem';

const drawerWidth = 240;

const Sidebar = () => {
	const [clickCreate, setClickCreate] = useState(false);
	const projects = useSelector((state) => state.projectCategories);

	// const catDeleteHandler = (projectId) => {
	// 	console.log(projectId);
	// 	dispatch(deleteProjectCat(projectId));
	// };

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
			variant='permanent'
			anchor='left'>
			<Box
				sx={{
					width: '100%',
					height: '100vh',
					background: (theme) => theme.palette.secondary.main,
				}}>
				<Container
					sx={{
						width: '100%',
						display: 'flex',
						mt: 9.5,
						mb: 4.75,
						pl: '0px !important',
						pr: '0px !important',
						boxSizing: 'border-box',
					}}>
					<AccountCircle
						sx={{ fontSize: '48px', mt: 'auto', mb: 'auto', ml: 4.5 }}
					/>
					<p style={{ fontSize: '24px', marginLeft: '20px' }}>Jennifer</p>
				</Container>
				<Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
					<List>
						<ListItem>
							<ListItemButton>
								<ListItemIcon>
									<Inbox />
								</ListItemIcon>
								<ListItemText primary='總覽' />
							</ListItemButton>
						</ListItem>
					</List>
				</Link>
				{/* 原本以下的 projects 為 ganttData */}
				{projects.length !== 0 ? (
					<>
						<List
							sx={{
								height: 192,
								overflowY: 'auto',
							}}>
							{projects.map((project) => {
								return (
									<ListItem key={project.id}>
										<Link
											to={`/projects/${project.name}`}
											style={{ textDecoration: 'none', color: 'inherit' }}>
											<ListItemButton>
												<ListItemIcon>
													<Folder />
												</ListItemIcon>
												<ListItemText primary={project.projectName} />
											</ListItemButton>
										</Link>
										<EditButton project={project} />
										<DeleteButton project={project} />
									</ListItem>
								);
							})}
						</List>
						<Divider />
						<CreateListItem
							clickCreate={clickCreate}
							setClickCreate={setClickCreate}
						/>
					</>
				) : (
					<>
						<Divider />
						<CreateListItem
							clickCreate={clickCreate}
							setClickCreate={setClickCreate}
						/>
					</>
				)}
			</Box>
		</Drawer>
	);
};

export default Sidebar;
