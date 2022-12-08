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
	Skeleton,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import DeleteButton from './ChangeList/DeleteButton';
import { EditButton } from './ChangeList/EditButton';
import CreateListItem from './CreateListItem/CreateListItem';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchCats } from '../../store/projectCatSlice';
import {
	fetchCatsToGantt,
	fetchTasksToGantt,
} from '../../store/ganttDataSlice';
import { API } from 'aws-amplify';

const drawerWidth = 240;

const Sidebar = () => {
	const [clickCreate, setClickCreate] = useState(false);
	const dispatch = useDispatch();
	const projects = useSelector((state) => state.projectCategories);
	const { signOut } = useAuthenticator((context) => [context.signOut]);
	const { user } = useAuthenticator((context) => [context.user]);
	const navigate = useNavigate();
	const isDataFetchedRef = useRef(false);
	console.log(user, 'user');

	const access_token = user.attributes.name;
	const id_token = user.attributes.zoneinfo;
	const scope = user.attributes['custom:scope'];
	const token_type = 'Bearer';

	const calendarTestData = {
		summary: 'Gantt Chart',
		description: 'Gantt Chart',
	};

	const event = {
		summary: 'Google I/O 2022',
		location: '800 Howard St., San Francisco, CA 94103',
		description: "A chance to hear more about Google's developer products.",
		startDateTime: '2022-12-10T09:00:00-07:00',
		endDateTime: '2022-12-10T17:00:00-07:00',
	};

	useEffect(() => {
		if (isDataFetchedRef.current) return;
		const fetchData = async () => {
			dispatch(fetchCats());
			await dispatch(fetchCatsToGantt());
			await dispatch(fetchTasksToGantt());
		};
		fetchData();
		API.post(
			'ganttDataToGoogleCalendarApi',
			'/ganttdatatogooglecalendar/create-calendar',
			{
				body: {
					access_token,
					event,
				},
			}
		);
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
					overflowX: 'hidden',
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
				{!projects.loading ? (
					<>
						<CreateListItem
							clickCreate={clickCreate}
							setClickCreate={setClickCreate}
						/>
						<Divider />
						<List
							sx={{
								height: 320,
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
						<CreateListItem
							clickCreate={clickCreate}
							setClickCreate={setClickCreate}
						/>
						<Divider />
						<Container
							sx={{
								mt: 2,
								ml: '16px',
								display: 'flex',
								alignItems: 'center',
								padding: '0 !important',
							}}>
							<Skeleton
								variant='circular'
								width={40}
								height={40}
								sx={{ display: 'inline-block' }}
							/>
							<Skeleton
								variant='rounded'
								width={150}
								height={48}
								sx={{ display: 'inline-block', ml: '16px' }}
							/>
						</Container>
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
