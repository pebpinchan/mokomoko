/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { RouterProvider } from 'react-router-dom';
import routesLink from './chap08/routesLink';
import DashboardContent from './chap08/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));

//root.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>
//);
root.render(
  <React.StrictMode>
    <DashboardContent />
  </React.StrictMode>
);

//root.render(
//  <RouterProvider router={routesLink} />
//);
