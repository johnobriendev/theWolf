import React, { useState, useEffect } from "react"
import PlayerInput from "./components/PlayerInput"
import WolfChoice from "./components/WolfChoice"

const initialState = {
  players: [],
  currentHole: 1,
  wolfChoices: {}
};


const getPlayerOrder = (hole, players, points) => {
  const baseOrder = [...Array(players.length).keys()];
  if (hole === 17 || hole === 18) {
    const totalPoints = players.map((_, idx) => ({
      idx,
      points: Object.values(points).reduce((acc, curr) => acc + (curr[idx] || 0), 0)
    }));
    totalPoints.sort((a, b) => b.points - a.points);
    return totalPoints.map(player => player.idx);
  } else {
    const startIdx = (hole - 1) % players.length;
    return baseOrder.map((_, idx) => baseOrder[(startIdx + idx) % players.length]);
  }
};





function App() {
  const [state, setState] = useState(initialState);
  const [newPlayer, setNewPlayer] = useState('');


  const handlePlayerNameChange = (e) => setNewPlayer(e.target.value);
  
  const handleAddPlayer = () => {
    if (newPlayer.trim()){
      setState((prevState) => ({
        ...prevState,
        players: [...prevState.players, newPlayer.trim()]
      }));
      setNewPlayer('');
    }
  };

  const handleDeletePlayer = (index) => {
    setState((prevState) => {
      const updatedPlayers = [...prevState.players];
      updatedPlayers.splice(index, 1);
      return { ...prevState, players: updatedPlayers };
    });
  };

  const handleWolfChoiceChange = (hole, choice) => {
    setState((prevState) => ({
      ...prevState,
      wolfChoices: {
        ...prevState.wolfChoices,
        [hole]: choice
      }
    }));
  };

  const handleHoleChange = (delta) => {
    setState((prevState) => ({
      ...prevState,
      currentHole: Math.max(1, Math.min(18, prevState.currentHole + delta))
    }));
  };

  useEffect(() => {
    if (state.players.length === 4) {
      const order = getPlayerOrder(state.currentHole, state.players);
      const wolfIndex = order[order.length - 1];
      const wolf = state.players[wolfIndex];
      const wolfChoice = { wolf, partner: '', blindWolf: false, loneWolf: false };
      handleWolfChoiceChange(state.currentHole, wolfChoice);
    }
  }, [state.currentHole, state.players]);



  return(
    <div className="container">
      {state.players.length < 4 ? (
        <div>
          <PlayerInput
            newPlayer={newPlayer}
            handlePlayerNameChange={handlePlayerNameChange}
            handleAddPlayer={handleAddPlayer}
          />
          <ul>
              {state.players.map((player, index) => (
                <li key={index}>
                  {player} <button onClick={() => handleDeletePlayer(index)}>Delete</button>
                </li>
              ))}
          </ul>
        </div>      

      ) : (
        <>
          <div className="hole-navigation">
            <button onClick={() => handleHoleChange(-1)} disabled={state.currentHole === 1}>Previous Hole</button>
            <span>Hole {state.currentHole}</span>
            <button onClick={() => handleHoleChange(1)} disabled={state.currentHole === 18}>Next Hole</button>
          </div>
          <WolfChoice
            currentHole={state.currentHole}
            players={state.players}
            wolfChoices={state.wolfChoices}
            handleWolfChoiceChange={handleWolfChoiceChange}
          />
          {/* Add stroke inputs and scorecard components here */}
        </>
      )}
    </div>
  );

}

export default App
