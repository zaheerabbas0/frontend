import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import AppStore from './reduxToolkit/app/AppStore';
import { Provider } from 'react-redux';
import RenderRoutes from './routes/routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = RenderRoutes();
root.render(
  <Provider store={AppStore}>
    <RouterProvider router={router} />
  </Provider>
);
