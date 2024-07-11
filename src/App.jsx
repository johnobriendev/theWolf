import React, { useState, useEffect } from "react";
import PlayerInput from "./components/PlayerInput";
import WolfChoice from "./components/WolfChoice";
import Scorecard from "./components/Scorecard";
import Pointscard from "./components/Pointscard";


const initialState = {
  players: [],
  currentHole: 1,
  gameStarted: false,
  wolfChoices: {},
  strokes: {},
  points:{},
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



function App() {
  const [state, setState] = useState(initialState);
  const [newPlayer, setNewPlayer] = useState('');
  const [teeOrder, setTeeOrder] = useState([]);


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

  const handleStartGame = () => {
    setState((prevState) => ({
      ...prevState,
      gameStarted: true
    }));
    setTeeOrder(state.players);
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

  const handleStrokeChange = (player, strokes) => {
    setState((prevState) => ({
      ...prevState,
      strokes: {
        ...prevState.strokes,
        [state.currentHole]: {
          ...prevState.strokes[state.currentHole],
          [player]: strokes
        }
      }
    }));
  };

  const handleHoleChange = (delta) => {
    setState((prevState) => ({
      ...prevState,
      currentHole: Math.max(1, Math.min(18, prevState.currentHole + delta))
    }));
  };
  
  const handleRuleChange = (newRules) => {
    setState((prevState) => ({
      ...prevState,
      rules: newRules
    }));
  };

  const handlePointsChange = (hole, playerIndex, points) => {
    setState((prevState) => {
      const updatedPoints = { ...prevState.points };
      if (!updatedPoints[hole]) {
        updatedPoints[hole] = Array(prevState.players.length).fill(0);
      }
      updatedPoints[hole][playerIndex] = points;
      return { ...prevState, points: updatedPoints };
    });
  };

  

  useEffect(() => {
    if (state.currentHole > 1 && state.currentHole < 17) {
      setTeeOrder((prevOrder) => {
        const newOrder = [...prevOrder];
        const lastPlayer = newOrder.pop();
        newOrder.unshift(lastPlayer);
        return newOrder;
      });
    } else if (state.currentHole === 1) {
      setTeeOrder(state.players);
    }
  }, [state.currentHole]);

  const getCurrentHoleStrokes = () => {
    return state.strokes[state.currentHole] || {};
  };


  useEffect(() => {
    const calculatePoints = (wolfChoice, wolfScore, opponentScores) => {
      const { rules } = state;
      let points = Array(state.players.length).fill(0);

      if (wolfChoice) {
        const wolfIndex = state.players.indexOf(wolfChoice);
        const minOpponentScore = Math.min(...opponentScores.map(([, score]) => score));
        const tie = wolfScore === minOpponentScore;

        if (wolfChoice === 'blindWolf') {
          // Blind Wolf logic
        } else if (wolfChoice === state.players[state.currentHole % state.players.length]) {
          // Lone Wolf
          const { wolf, opponents: oppPoints } = tie ? rules.loneWolfTie : wolfScore < minOpponentScore ? rules.loneWolfWin : rules.loneWolfLose;
          points[wolfIndex] = wolf;
          opponentScores.forEach(([player, score], i) => {
            if (score === minOpponentScore || !tie) {
              points[state.players.indexOf(player)] = oppPoints;
            }
          });
        } else {
          // Wolf with Partner logic
        }
      }

      return points;
    };

    const currentHoleStrokes = state.strokes[state.currentHole];
    if (currentHoleStrokes) {
      const wolfChoice = state.wolfChoices[state.currentHole];
      if (wolfChoice) {
        const wolfScore = currentHoleStrokes[wolfChoice];
        const opponentScores = Object.entries(currentHoleStrokes).filter(([player]) => player !== wolfChoice);
        const points = calculatePoints(wolfChoice, wolfScore, opponentScores);

        setState((prevState) => ({
          ...prevState,
          points: {
            ...prevState.points,
            [state.currentHole]: points
          }
        }));
      }
    }
  }, [state.strokes, state.wolfChoices, state.currentHole, state.players, state.rules]);


  return(
    <div className="container">
      {!state.gameStarted ? (
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
          {state.players.length === 4 && (
            <button onClick={handleStartGame}>Start Game</button>
          )}
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
            teeOrder={teeOrder}
          />
          <div className="scores">
            <h3>Enter Scores for Hole {state.currentHole}</h3>
            {teeOrder.map((player, index) => (
              <div key={player} className="score-entry">
                <span>{player}:</span>
                <input
                  type="number"
                  value={getCurrentHoleStrokes()[player] || ''}
                  onChange={(e) => handleStrokeChange(player, parseInt(e.target.value) || '')}
                />
              </div>
            ))}
          </div>
          <Scorecard
            players={state.players}
            strokes={state.strokes}
          />
          <Pointscard
            players={state.players}
            points={state.points}
          />
        </>
      )}
    </div>
  );

}

export default App
