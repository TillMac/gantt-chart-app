import { Box, Container, useMediaQuery } from '@mui/material';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';

const logoImg = require('../assets/logo.png');
const pplImg = require('../assets/people.png');

const LogIn = () => {
	const { route } = useAuthenticator((context) => [context.route]);
	const navigate = useNavigate();
	let from = '/';

	const mobileMatches = useMediaQuery('(min-width:600px', { noSsr: true });
	const tabletMatches = useMediaQuery('(min-width:1200px', { noSsr: true });
	const laptopMatches = useMediaQuery('(min-width:1536px', { noSsr: true });

	useEffect(() => {
		if (route !== 'authenticated') return;
		navigate(from, { replace: true });
	}, [route, navigate, from]);

	useEffect(() => {
		window.nani = API;
	}, []);

	if (!mobileMatches && !tabletMatches && !laptopMatches) {
		return (
			<Box
				sx={{
					width: '100%',
					height: '100vh',
					display: 'flex',
					flexWrap: 'wrap',
				}}>
				<Container sx={{ display: 'flex', padding: '0 !important' }}>
					<img
						src={logoImg}
						alt='Logo'
						style={{
							width: '20%',
							margin: 'auto',
						}}
					/>
				</Container>
				<Container
					sx={{
						margin: 'auto',
					}}>
					<Container sx={{ margin: 'auto' }}>
						<Authenticator
							loginMechanisms={['email']}
							socialProviders={['google']}
						/>
					</Container>
				</Container>
				<Container
					sx={{
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContents: 'center',
						textAlign: 'center',
					}}>
					<p style={{ margin: 'auto' }}>
						Copyright © 2022 TillMac All Rights Reserved.
					</p>
				</Container>
			</Box>
		);
	}

	if (!tabletMatches && !laptopMatches && mobileMatches) {
		return (
			<Container
				sx={{
					width: '100%',
					height: '100vh',
					display: 'flex',
					flexWrap: 'wrap',
				}}>
				<Container
					sx={{ display: 'flex', margin: 'auto', padding: '0 !important' }}>
					<img
						src={logoImg}
						alt='Logo'
						style={{
							width: '20%',
							margin: 'auto',
						}}
					/>
				</Container>
				<Container sx={{ textAlign: 'center', margin: 'auto' }}>
					<h1
						style={{
							fontSize: '72px',
							margin: 'auto',
						}}>
						Create Your Gantt.
					</h1>
				</Container>
				<Container
					sx={{
						margin: 'auto',
					}}>
					<div style={{ margin: 'auto' }}>
						<Authenticator
							loginMechanisms={['email']}
							socialProviders={['google']}
						/>
					</div>
				</Container>
				<Container
					sx={{
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContents: 'center',
						textAlign: 'center',
					}}>
					<p style={{ margin: 'auto' }}>
						Copyright © 2022 TillMac All Rights Reserved.
					</p>
				</Container>
			</Container>
		);
	}

	if (!laptopMatches && tabletMatches && mobileMatches) {
		return (
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					width: '100%',
					height: '100vh',
					gap: '2.5%',
				}}>
				<Box sx={{ position: 'relative' }}>
					<Container sx={{ display: 'flex' }}>
						<img
							src={logoImg}
							alt='Logo'
							style={{
								marginTop: '48px',
								marginLeft: '24px',
								width: '80px',
								display: 'block',
							}}
						/>
					</Container>
					<Container sx={{ display: 'flex', height: '75vh' }}>
						<Container
							sx={{
								padding: '0 !important',
								mt: 'auto',
								mb: 'auto',
								ml: '24px',
							}}>
							<Authenticator
								loginMechanisms={['email']}
								socialProviders={['google']}
							/>
						</Container>
					</Container>
				</Box>
				<Box
					sx={{
						position: 'relative',
						minWidth: '680px',
						height: '75hv',
					}}>
					<h1
						style={{
							fontSize: '72px',
						}}>
						Create Your Gantt.
					</h1>
					<Container sx={{ padding: '0 !important' }}>
						<div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
							<div
								style={{
									marginTop: '48px',
									width: '300px',
									height: '40px',
									background: '#EAC4D5',
									borderRadius: '12px',
								}}
							/>
							<div
								style={{
									marginTop: '20px',
									marginLeft: '300px',
									width: '220px',
									height: '40px',
									background: '#686963',
									borderRadius: '12px',
								}}
							/>
							<div
								style={{
									marginTop: '20px',
									width: '120px',
									height: '40px',
									background: '#FFCF77',
									borderRadius: '12px',
								}}
							/>
							<div
								style={{
									marginTop: '20px',
									marginLeft: '120px',
									width: '200px',
									height: '40px',
									background: '#567568',
									borderRadius: '12px',
								}}
							/>
							<div
								style={{
									marginTop: '20px',
									marginLeft: '320px',
									width: '360px',
									height: '40px',
									background: '#EAC4D5',
									borderRadius: '12px',
								}}
							/>
							<div
								style={{
									marginTop: '20px',
									width: '200px',
									height: '40px',
									background: '#686963',
									borderRadius: '12px',
								}}
							/>
							<div
								style={{
									marginTop: '20px',
									marginLeft: '200px',
									width: '320px',
									height: '40px',
									background: '#FFCF77',
									borderRadius: '12px',
								}}
							/>
						</div>
					</Container>
					<img
						src={pplImg}
						alt='people'
						style={{
							position: 'absolute',
							bottom: 0,
							right: 0,
							zIndex: 1,
							width: '360px',
						}}
					/>
				</Box>
				<Container
					sx={{
						textAlign: 'center',
					}}>
					Copyright © 2022 TillMac All Rights Reserved.
				</Container>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				width: '100%',
				height: '100vh',
				gap: '2.5%',
			}}>
			<Box sx={{ position: 'relative' }}>
				<Container sx={{ display: 'flex' }}>
					<img
						src={logoImg}
						alt='Logo'
						style={{
							marginTop: '96px',
							marginLeft: '24px',
							width: '80px',
							display: 'block',
						}}
					/>
				</Container>
				<Container sx={{ display: 'flex', height: '70vh' }}>
					<Container
						sx={{
							padding: '0 !important',
							mt: 'auto',
							mb: 'auto',
							ml: '24px',
						}}>
						<Authenticator
							loginMechanisms={['email']}
							socialProviders={['google']}
						/>
					</Container>
				</Container>
			</Box>
			<Box
				sx={{
					position: 'relative',
					width: '60%',
					height: '75hv',
				}}>
				<h1
					style={{
						fontSize: '72px',
						marginTop: '96px',
					}}>
					Create Your Gantt.
				</h1>
				<Container sx={{ padding: '0 !important', width: '100%' }}>
					<div style={{ marginTop: '108px' }}>
						<div
							style={{
								marginTop: '48px',
								width: '300px',
								height: '40px',
								background: '#EAC4D5',
								borderRadius: '12px',
							}}
						/>
						<div
							style={{
								marginTop: '20px',
								marginLeft: '300px',
								width: '220px',
								height: '40px',
								background: '#686963',
								borderRadius: '12px',
							}}
						/>
						<div
							style={{
								marginTop: '20px',
								width: '120px',
								height: '40px',
								background: '#FFCF77',
								borderRadius: '12px',
							}}
						/>
						<div
							style={{
								marginTop: '20px',
								marginLeft: '120px',
								width: '200px',
								height: '40px',
								background: '#567568',
								borderRadius: '12px',
							}}
						/>
						<div
							style={{
								marginTop: '20px',
								marginLeft: '320px',
								width: '360px',
								height: '40px',
								background: '#EAC4D5',
								borderRadius: '12px',
							}}
						/>
						<div
							style={{
								marginTop: '20px',
								width: '200px',
								height: '40px',
								background: '#686963',
								borderRadius: '12px',
							}}
						/>
						<div
							style={{
								marginTop: '20px',
								marginLeft: '200px',
								width: '320px',
								height: '40px',
								background: '#FFCF77',
								borderRadius: '12px',
							}}
						/>
					</div>
				</Container>
				<img
					src={pplImg}
					alt='people'
					style={{
						position: 'absolute',
						bottom: 0,
						right: 0,
						zIndex: 1,
						width: '360px',
					}}
				/>
			</Box>
			<Container
				sx={{
					textAlign: 'center',
				}}>
				Copyright © 2022 TillMac All Rights Reserved.
			</Container>
		</Box>
	);
};

export default LogIn;
