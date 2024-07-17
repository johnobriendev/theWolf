import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import App from './App.jsx'
import HomePage from './components/HomePage';
import RulesPage from './components/RulesPage';
import './index.css'
import SettingsPage from './components/SettingsPage.jsx';
import { RulesProvider } from './contexts/RulesContext.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/rules',
    element: <RulesPage />,
  },
  {
    path: '/game',
    element: <App />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RulesProvider>
      <RouterProvider router={router} />
    </RulesProvider>
    
  </React.StrictMode>,
)
