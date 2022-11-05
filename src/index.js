import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GanttArea,  { loader as ganttDataLoader } from './component/GanttArea';
import ErrorPage from './component/ErrorPage';

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
        loader: ganttDataLoader,
      },
    ]
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);