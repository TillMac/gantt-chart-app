import { Box, Container } from '@mui/material';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import config from '../aws-exports';
import React from 'react';

import '@aws-amplify/ui-react/styles.css';

const logoImg = require('../assets/logo.png');
const pplImg = require('../assets/people.png');

const LogIn = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				width: '100%',
				height: '100vh',
			}}>
			<Box sx={{ width: '45%', position: 'relative' }}>
				<img
					src={logoImg}
					alt='Logo'
					style={{
						marginTop: '48px',
						marginLeft: '48px',
						width: '80px',
						display: 'block',
					}}
				/>
				<div
					style={{
						width: '400px',
						marginTop: '48px',
						marginLeft: '48px',
					}}>
					<Authenticator
						loginMechanisms={['email']}
						socialProviders={['google']}
					/>
				</div>
			</Box>
			<Box sx={{ width: '55%', position: 'relative' }}>
				<h1
					style={{
						fontSize: '72px',
					}}>
					Create Your Gantt.
				</h1>
				<div>
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
					width: '100%',
					height: '1vh',
					textAlign: 'center',
				}}>
				Copyright © 2022 TillMac All Rights Reserved.
			</Container>
		</Box>
	);
};

export default LogIn;
