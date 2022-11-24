import {
	AccountCircle,
	Folder,
	Inbox,
	LogoutOutlined,
} from '@mui/icons-material';
import {
	Box,
	Container,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import DeleteButton from './ChangeList/DeleteButton';
import { EditButton } from './ChangeList/EditButton';
import CreateListItem from './CreateListItem/CreateListItem';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchCats } from '../../store/projectCatSlice';
import { fetchCatsToGantt } from '../../store/ganttDataSlice';

const drawerWidth = 240;

const Sidebar = () => {
	const [clickCreate, setClickCreate] = useState(false);
	const dispatch = useDispatch();
	const projects = useSelector((state) => state.projectCategories);
	const { signOut } = useAuthenticator((context) => [context.signOut]);
	const navigate = useNavigate();
	const isDataFetchedRef = useRef(false);

	useEffect(() => {
		if (isDataFetchedRef.current) return;
		dispatch(fetchCats());
		dispatch(fetchCatsToGantt());
		isDataFetchedRef.current = true;
	}, []);

	const logOutHandler = () => {
		signOut();
		navigate('/login');
	};

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
				<List>
					<ListItem>
						<ListItemButton
							component={NavLink}
							to={'/'}
							end
							sx={{
								textDecoration: 'none',
								color: 'inherit',
								'&.active': {
									borderBottom: '#8884FF thick double ',
								},
							}}>
							<ListItemIcon>
								<Inbox />
							</ListItemIcon>
							<ListItemText primary='總覽' sx={{ ml: -1 }} />
						</ListItemButton>
					</ListItem>
				</List>
				{projects.cats.length !== 0 ? (
					<>
						<CreateListItem
							clickCreate={clickCreate}
							setClickCreate={setClickCreate}
						/>
						<Divider />
						<List
							sx={{
								height: 500,
								overflowY: 'auto',
							}}>
							{projects.cats.map((project) => {
								return (
									<ListItem key={project.id}>
										<ListItemButton
											component={NavLink}
											to={`/projects/${project.linkName}`}
											end
											sx={{
												textDecoration: 'none',
												color: 'inherit',
												'&.active': {
													borderBottom: '#8884FF thick double ',
												},
											}}>
											<ListItemIcon>
												<Folder />
											</ListItemIcon>
											<ListItemText
												primary={project.name}
												sx={{
													ml: -1,
												}}
											/>
											<EditButton project={project} />
											<DeleteButton project={project} />
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
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
				<IconButton
					size='large'
					sx={{ position: 'absolute', bottom: 10, right: 10 }}
					onClick={logOutHandler}>
					<LogoutOutlined />
				</IconButton>
			</Box>
		</Drawer>
	);
};

export default Sidebar;
