import React from 'react';
import ReactDOM from 'react-dom/client';
import awsExports from './aws-exports';
import { Amplify } from 'aws-amplify';
import './index.css';
import App from './App';
import TotalViewGanttArea from './component/TotalViewGanttArea';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GanttArea from './component/GanttArea/GanttArea';
import ErrorPage from './component/ErrorPage';
import LogIn from './pages/LogIn';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { Authenticator } from '@aws-amplify/ui-react';
import Setting from './pages/Setting';

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root'));
const route = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'projects/:name',
				element: <GanttArea />,
			},
			{
				index: true,
				element: <TotalViewGanttArea />,
			},
			{
				path: 'setting',
				element: <Setting />,
			},
		],
	},
	{
		path: '/login',
		element: <LogIn />,
		errorElement: <ErrorPage />,
	},
]);

root.render(
	<React.StrictMode>
		<Authenticator.Provider>
			<Provider store={store}>
				<RouterProvider router={route} />
			</Provider>
		</Authenticator.Provider>
	</React.StrictMode>
);
