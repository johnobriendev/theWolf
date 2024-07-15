import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import App from './App.jsx'
import HomePage from './components/HomePage';
import RulesPage from './components/RulesPage';
import CardsPage from './components/CardsPage';
import './index.css'
import { GameProvider } from './contexts/GameContext.jsx';


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
    path: '/cards',
    element: <CardsPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>
  </React.StrictMode>,
)
