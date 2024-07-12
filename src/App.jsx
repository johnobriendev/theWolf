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
const calculatePoints = (wolfChoice, wolfScores, opponentScores, rules) => {
  const lowestWolfScore = Math.min(...wolfScores);
  const lowestOpponentScore = Math.min(...opponentScores);

  console.log(`Calculating points for choice: ${wolfChoice}`);
  console.log(`Wolf Scores: ${wolfScores}, Opponent Scores: ${opponentScores}`);
  console.log(`Lowest Wolf Score: ${lowestWolfScore}, Lowest Opponent Score: ${lowestOpponentScore}`);

  let wolfPoints = 0;
  let opponentPoints = 0;

  if (wolfChoice === 'blindWolf') {
    if (lowestWolfScore < lowestOpponentScore) {
      wolfPoints = rules.blindWolfWin.wolf;
      opponentPoints = rules.blindWolfWin.opponents;
    } else if (lowestWolfScore > lowestOpponentScore) {
      wolfPoints = rules.blindWolfLose.wolf;
      opponentPoints = rules.blindWolfLose.opponents;
    } else {
      wolfPoints = rules.blindWolfTie.wolf;
      opponentPoints = rules.blindWolfTie.opponents;
    }
  } else if (wolfChoice === 'loneWolf') {
    if (lowestWolfScore < lowestOpponentScore) {
      wolfPoints = rules.loneWolfWin.wolf;
      opponentPoints = rules.loneWolfWin.opponents;
    } else if (lowestWolfScore > lowestOpponentScore) {
      wolfPoints = rules.loneWolfLose.wolf;
      opponentPoints = rules.loneWolfLose.opponents;
    } else {
      wolfPoints = rules.loneWolfTie.wolf;
      opponentPoints = rules.loneWolfTie.opponents;
    }
  } else { //if (wolfChoice === 'wolfWithPartner') {
    if (lowestWolfScore < lowestOpponentScore) {
      wolfPoints = rules.wolfWithPartnerWin.wolf;
      opponentPoints = rules.wolfWithPartnerWin.opponents;
    } else if (lowestWolfScore > lowestOpponentScore) {
      wolfPoints = rules.wolfWithPartnerLose.wolf;
      opponentPoints = rules.wolfWithPartnerLose.opponents;
    } else {
      wolfPoints = rules.wolfWithPartnerTie.wolf;
      opponentPoints = rules.wolfWithPartnerTie.opponents;
    }
  }

  console.log(`Calculated Points - Wolf: ${wolfPoints}, Opponents: ${opponentPoints}`);


  return { wolfPoints, opponentPoints };
};

function App() {
  const [state, setState] = useState(initialState);
  const [newPlayer, setNewPlayer] = useState('');
  // const [originalTeeOrder, setOriginalTeeOrder] = useState([]);
  // const [lastTwoHolesTeeOrder, setLastTwoHolesTeeOrder] = useState([]);
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
    const initialTeeOrder = [...state.players];
    const calculatedTeeOrder = [];
    
    for (let i = 0; i < 16; i++) {
      calculatedTeeOrder.push([...initialTeeOrder]);
      const lastPlayer = initialTeeOrder.pop();
      initialTeeOrder.unshift(lastPlayer);
    }
    setTeeOrder(calculatedTeeOrder);
    setState((prevState) => ({
      ...prevState,
      gameStarted: true
    }));
   
  };
  // const calculateTotalPoints = (player) => {
  //   return Object.values(state.points).reduce((sum, holePoints) => sum + (holePoints[player] || 0), 0);
  // };

  // const handleHoleChange = (delta) => {
  //   setState((prevState) => {
  //     const newHole = Math.max(1, Math.min(18, prevState.currentHole + delta));
      
  //     // If we're moving to hole 17, recalculate the tee order based on points
  //     if (newHole === 17 && prevState.currentHole === 16) {
  //       const sortedPlayers = [...state.players].sort((a, b) => {
  //         return calculateTotalPoints(b) - calculateTotalPoints(a);
  //       });
  //       setTeeOrder(prevOrder => {
  //         const newOrder = [...prevOrder];
  //         newOrder[16] = sortedPlayers;
  //         newOrder[17] = sortedPlayers;
  //         return newOrder;
  //       });
  //     }
      
  //     return { ...prevState, currentHole: newHole };
  //   });
  // };

  const handleWolfChoiceChange = (hole, choice) => {
    setState((prevState) => {
      const currentChoice = prevState.wolfChoices[hole];
      if (currentChoice && currentChoice.choice === choice.choice) {
        return prevState; // No change, avoid state update
      }
      return {
        ...prevState,
        wolfChoices: {
          ...prevState.wolfChoices,
          [hole]: choice
        }
      };
    });
  };

  const handleTeamsUpdate = (hole, updatedTeams) => {
    setTeams((prevTeams) => ({
      ...prevTeams,
      [hole]: updatedTeams
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
    if (state.currentHole > 16) {
      const calculateTotalPoints = (player) => {
        return Object.values(state.points).reduce((sum, holePoints) => sum + (holePoints[player] || 0), 0);
      };
  
      const sortedPlayers = [...state.players].sort((a, b) => {
        return calculateTotalPoints(b) - calculateTotalPoints(a);
      });
  
      setTeeOrder((prevTeeOrder) => {
        const newTeeOrder = [...prevTeeOrder];
        newTeeOrder[16] = sortedPlayers;
        newTeeOrder[17] = sortedPlayers;
        return newTeeOrder;
      });
    }
  }, [state.currentHole, state.points, state.players]);

  // useEffect(() => {
  //   if (state.currentHole >= 17) {
  //     const calculateTotalPoints = (player) => {
  //       return Object.values(state.points).reduce((sum, holePoints) => sum + (holePoints[player] || 0), 0);
  //     };
  
  //     const sortedPlayers = [...state.players].sort((a, b) => {
  //       return calculateTotalPoints(b) - calculateTotalPoints(a);
  //     });
      
  //     setLastTwoHolesTeeOrder([sortedPlayers, sortedPlayers]);

   
  //   }
  // }, [state.currentHole, state.points, state.players]);

  const getCurrentTeeOrder = () => {
    if (state.currentHole <= 16) {
      return originalTeeOrder[state.currentHole - 1] || state.players;
    } else {
      return lastTwoHolesTeeOrder[state.currentHole - 17] || state.players;
    }
  };

  // //calculates the TeeOrder for the last two holes based on points
  // useEffect(() => {
  //   if (state.currentHole > 16) {
  //     const sortedPlayers = [...state.players].sort((a, b) => {
  //       const pointsA = Object.values(state.points).reduce((sum, holePoints) => sum + (holePoints[state.players.indexOf(a)] || 0), 0);
  //       const pointsB = Object.values(state.points).reduce((sum, holePoints) => sum + (holePoints[state.players.indexOf(b)] || 0), 0);
  //       return pointsB - pointsA;
  //     });
  //     setTeeOrder([sortedPlayers]);
  //   }
  // }, [state.currentHole, state.points, state.players]);

 

  const getCurrentHoleStrokes = () => {
    return state.strokes[state.currentHole] || {};
  };

  const handleCalculatePoints = () => {
    const currentChoice = state.wolfChoices[state.currentHole];
    if (!currentChoice) {
      console.error(`No wolf choice found for hole ${state.currentHole}`);
      return;
    }

    const currentTeeOrder = teeOrder[state.currentHole - 1] || state.players;
    const wolf = currentTeeOrder[currentTeeOrder.length - 1]; // wolf is the last in the list
    const partner = currentChoice.choice !== 'loneWolf' && currentChoice.choice !== 'blindWolf' ? currentChoice.choice : null;

    const wolfTeam = partner ? [wolf, partner] : [wolf];
    const opponents = state.players.filter(player => !wolfTeam.includes(player));

    const wolfScores = wolfTeam.map(player => state.strokes[state.currentHole][player] || 0);
    const opponentScores = opponents.map(player => state.strokes[state.currentHole][player] || 0);

    console.log(`Wolf Team: ${wolfTeam.join(', ')}`);
    console.log(`Opponents: ${opponents.join(', ')}`);
    console.log(`Wolf Scores: ${wolfScores.join(', ')}`);
    console.log(`Opponent Scores: ${opponentScores.join(', ')}`);


    const { wolfPoints, opponentPoints } = calculatePoints(currentChoice.choice, wolfScores, opponentScores, state.rules);

      // Update points
    setState((prevState) => {
      const newPoints = { ...prevState.points };
      if (!newPoints[state.currentHole]) {
        newPoints[state.currentHole] = {};
      }
      
      wolfTeam.forEach(player => {
        newPoints[state.currentHole][player] = wolfPoints;
      });
      
      opponents.forEach(player => {
        newPoints[state.currentHole][player] = opponentPoints;
      });

      return {
        ...prevState,
        points: newPoints
      };
    });
  };

  

  return(
    <div className="container">
      {!state.gameStarted ? (
        <div>
          <PlayerInput
            newPlayer={newPlayer}
            handlePlayerNameChange={handlePlayerNameChange}
            handleAddPlayer={handleAddPlayer}
            handleDeletePlayer={handleDeletePlayer}
            handleStartGame={handleStartGame}
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
            // teeOrder={teeOrder}
            teeOrder={teeOrder[state.currentHole - 1] || state.players}
            // teeOrder={getCurrentTeeOrder()}
            handleTeamsUpdate={handleTeamsUpdate}
            strokes={state.strokes[state.currentHole] || {}}
            onStrokeChange={handleStrokeChange}
          />
          <div className="scores">
            <h3>Enter Scores for Hole {state.currentHole}</h3>
            {teeOrder[state.currentHole - 1] && teeOrder[state.currentHole - 1].map((player, index) => (
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
          <button onClick={handleCalculatePoints}>Calculate Points</button>
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
