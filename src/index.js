import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TotalViewGanttArea from './component/TotalViewGanttArea';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GanttArea from './component/GanttArea';
import ErrorPage from './component/ErrorPage';
import { Provider } from 'react-redux';
import { store } from './store/index';

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
		],
	},
]);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={route} />
		</Provider>
	</React.StrictMode>
);
