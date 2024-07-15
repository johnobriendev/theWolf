import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export const initialState = {
  players: [],
  currentHole: 1,
  gameStarted: false,
  wolfChoices: {},
  strokes: {},
  points: {},
  rules: {
    blindWolfWin: { wolf: 6, opponents: 0 },
    blindWolfLose: { wolf: 0, opponents: 2 },
    blindWolfTie: { wolf: 0, opponents: 0 },
    loneWolfWin: { wolf: 3, opponents: 0 },
    loneWolfLose: { wolf: 0, opponents: 1 },
    loneWolfTie: { wolf: 0, opponents: 0 },
    wolfWithPartnerWin: { wolf: 1, opponents: 0 },
    wolfWithPartnerLose: { wolf: 0, opponents: 2 },
    wolfWithPartnerTie: { wolf: 0, opponents: 0 },
  },
};

export const GameProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const savedState = JSON.parse(localStorage.getItem('gameState'));
    return savedState || initialState;
  });

  // useEffect(() => {
  //   const stateToSave = {
  //     players: state.players,
  //     currentHole: state.currentHole,
  //     gameStarted: state.gameStarted,
  //     wolfChoices: state.wolfChoices,
  //     strokes: state.strokes,
  //     points: state.points,
  //     rules: state.rules,
  //     // Add any other necessary state properties here
  //   };
  //   localStorage.setItem('gameState', JSON.stringify(state));
  // }, [state]);




  return (
    <GameContext.Provider value={{ state, setState }}>
      {children}
    </GameContext.Provider>
  );
};