import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Scorecard from './Scorecard';
import Pointscard from './Pointscard';
import { GameContext } from '../contexts/GameContext';


const CardsPage = () => {
  const { state } = useContext(GameContext)
  return (
    <div>
      <h1>Cards Page</h1>
      <Link to="/game">
        <button>Go to Game Page</button>
      </Link>
      <div className="flex gap-8">
      <Scorecard
          players={state.players}
          strokes={state.strokes}
          currentHole={state.currentHole}
        />
        <Pointscard
          players={state.players}
          points={state.points}
          currentHole={state.currentHole}
        />
      </div>
    </div>
  );

};

export default CardsPage;