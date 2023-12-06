import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/animated",
    element: <App animated />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <section id="loading-screen">
        <div id="loader"></div>
      </section>
      <RouterProvider router={router} />
    </>
  </React.StrictMode>,
);
