// frontend/src/main.jsx (entièrement remplacé)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import TimelineDetail from './pages/TimelineDetail.jsx'; // Importer notre nouvelle page
import './index.css';

// Création de la configuration du routeur
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // La page d'accueil (liste des frises)
  },
  {
    path: "/timeline/:id",
    element: <TimelineDetail />, // La page de détail d'une frise
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);