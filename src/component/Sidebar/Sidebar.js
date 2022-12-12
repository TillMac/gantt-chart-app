import {
	AccountCircle,
	Folder,
	Inbox,
	LogoutOutlined,
	SettingsOutlined,
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
import { Link, NavLink, useNavigate } from 'react-router-dom';
import DeleteButton from './ChangeList/DeleteButton';
import { EditButton } from './ChangeList/EditButton';
import CreateListItem from './CreateListItem/CreateListItem';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchCats } from '../../store/projectCatSlice';
import {
	fetchCatsToGantt,
	fetchTasksToGantt,
} from '../../store/ganttDataSlice';
import {
	addUserData,
	fetchUserData,
	updateUserPhotoAndEmail,
} from '../../store/userDataSlice';
import { API } from 'aws-amplify';

const drawerWidth = 240;

const Sidebar = () => {
	const [clickCreate, setClickCreate] = useState(false);
	const dispatch = useDispatch();
	const projects = useSelector((state) => state.projectCategories);
	const userData = useSelector((state) => state.userData);
	const { user } = useAuthenticator((context) => [context.user]);
	const { signOut } = useAuthenticator((context) => [context.signOut]);
	const navigate = useNavigate();
	const isDataFetchedRef = useRef(false);

	useEffect(() => {
		if (isDataFetchedRef.current) return;
		const fetchData = async () => {
			dispatch(fetchCats());
			dispatch(fetchUserData());
			await dispatch(fetchCatsToGantt());
			await dispatch(fetchTasksToGantt());
			const username = user.username;
			if (userData.userData.length !== 0) {
				if (username.indexOf('google') === -1) {
					const newUser = {
						username,
						photoLink: null,
						email: user.attributes.email,
					};
					dispatch(addUserData(newUser));
					API.post('usersApi', '/users', {
						body: {
							username: newUser.username,
						},
					});
				} else {
					const newUser = {
						username: user.attributes.nickname,
						photoLink: user.attributes.photo,
						email: user.attributes.email,
					};
					dispatch(addUserData(newUser));
					API.post('usersApi', '/users', {
						body: {
							username: newUser.username,
						},
					});
				}
			} else {
				if (username.indexOf('google') === -1) {
					const newUser = {
						photoLink: null,
						email: user.attributes.email,
					};
					dispatch(updateUserPhotoAndEmail(newUser));
				} else {
					const newUser = {
						photoLink: user.attributes.photo,
						email: user.attributes.email,
					};
					dispatch(updateUserPhotoAndEmail(newUser));
				}
			}
		};
		fetchData();
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
					{!!userData.isLoading || userData.userData.length === 0 ? (
						<>
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
						</>
					) : (
						<>
							{userData.userData[0].photoLink !== null ? (
								<img
									src={userData.userData[0].photoLink}
									style={{
										width: '40px',
										borderRadius: '50%',
										marginTop: 'auto',
										marginBottom: 'auto',
										marginLeft: '36px',
									}}
									alt='user icon'
								/>
							) : (
								<AccountCircle
									sx={{ fontSize: '48px', mt: 'auto', mb: 'auto', ml: 4.5 }}
								/>
							)}
							<p
								style={{
									fontSize: '24px',
									marginLeft: '20px',
									overflow: 'hidden',
									maxHeight: '36px',
									maxWidth: '96px',
									textOverflow: 'ellipsis',
								}}>
								{userData.userData[0].username}
							</p>
						</>
					)}
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
				<Box
					sx={{
						position: 'absolute',
						bottom: 10,
						right: 10,
						display: 'flex',
						width: '100%',
						flexDirection: 'row-reverse',
						alignItems: 'center',
					}}>
					<IconButton size='large' onClick={logOutHandler}>
						<LogoutOutlined />
					</IconButton>
					<IconButton size='large' component={Link} to={'setting'}>
						<SettingsOutlined />
					</IconButton>
				</Box>
			</Box>
		</Drawer>
	);
};

export default Sidebar;
