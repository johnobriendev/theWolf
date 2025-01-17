import React, { useState, useEffect } from "react";
import PlayerInput from "./components/PlayerInput";
import WolfChoice from "./components/WolfChoice";
import ScoreModal from "./components/ScoreModal";
import { useRules } from "./contexts/RulesContext";



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
// const calculatePoints = (wolfChoice, wolfScores, opponentScores, rules) => {
//   const lowestWolfScore = Math.min(...wolfScores);
//   const lowestOpponentScore = Math.min(...opponentScores);

//   console.log(`Calculating points for choice: ${wolfChoice}`);
//   console.log(`Wolf Scores: ${wolfScores}, Opponent Scores: ${opponentScores}`);
//   console.log(`Lowest Wolf Score: ${lowestWolfScore}, Lowest Opponent Score: ${lowestOpponentScore}`);

//   let wolfPoints = 0;
//   let opponentPoints = 0;

//   if (wolfChoice === 'blindWolf') {
//     if (lowestWolfScore < lowestOpponentScore) {
//       wolfPoints = rules.blindWolfWin.wolf;
//       opponentPoints = rules.blindWolfWin.opponents;
//     } else if (lowestWolfScore > lowestOpponentScore) {
//       wolfPoints = rules.blindWolfLose.wolf;
//       opponentPoints = rules.blindWolfLose.opponents;
//     } else {
//       wolfPoints = rules.blindWolfTie.wolf;
//       opponentPoints = rules.blindWolfTie.opponents;
//     }
//   } else if (wolfChoice === 'loneWolf') {
//     if (lowestWolfScore < lowestOpponentScore) {
//       wolfPoints = rules.loneWolfWin.wolf;
//       opponentPoints = rules.loneWolfWin.opponents;
//     } else if (lowestWolfScore > lowestOpponentScore) {
//       wolfPoints = rules.loneWolfLose.wolf;
//       opponentPoints = rules.loneWolfLose.opponents;
//     } else {
//       wolfPoints = rules.loneWolfTie.wolf;
//       opponentPoints = rules.loneWolfTie.opponents;
//     }
//   } else { //if (wolfChoice === 'wolfWithPartner') {
//     if (lowestWolfScore < lowestOpponentScore) {
//       wolfPoints = rules.wolfWithPartnerWin.wolf;
//       opponentPoints = rules.wolfWithPartnerWin.opponents;
//     } else if (lowestWolfScore > lowestOpponentScore) {
//       wolfPoints = rules.wolfWithPartnerLose.wolf;
//       opponentPoints = rules.wolfWithPartnerLose.opponents;
//     } else {
//       wolfPoints = rules.wolfWithPartnerTie.wolf;
//       opponentPoints = rules.wolfWithPartnerTie.opponents;
//     }
//   }

//   console.log(`Calculated Points - Wolf: ${wolfPoints}, Opponents: ${opponentPoints}`);


//   return { wolfPoints, opponentPoints };
// };

function App() {
  const { rules } = useRules();
  const [state, setState] = useState({
    ...initialState,
    rules: rules, // Use the rules from the context
  });
  // const [state, setState] = useState(initialState);
  const [newPlayer, setNewPlayer] = useState('');
  const [teeOrder, setTeeOrder] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const calculatePoints = (wolfChoice, wolfScores, opponentScores) => {
    const lowestWolfScore = Math.min(...wolfScores);
    const lowestOpponentScore = Math.min(...opponentScores);

    console.log(`Calculating points for choice: ${wolfChoice}`);
    console.log(`Wolf Scores: ${wolfScores}, Opponent Scores: ${opponentScores}`);
    console.log(`Lowest Wolf Score: ${lowestWolfScore}, Lowest Opponent Score: ${lowestOpponentScore}`);

    let wolfPoints = 0;
    let opponentPoints = 0;

    if (wolfChoice === 'blindWolf') {
      if (lowestWolfScore < lowestOpponentScore) {
        wolfPoints = state.rules.blindWolfWin.wolf;
        opponentPoints = state.rules.blindWolfWin.opponents;
      } else if (lowestWolfScore > lowestOpponentScore) {
        wolfPoints = state.rules.blindWolfLose.wolf;
        opponentPoints = state.rules.blindWolfLose.opponents;
      } else {
        wolfPoints = state.rules.blindWolfTie.wolf;
        opponentPoints = state.rules.blindWolfTie.opponents;
      }
    } else if (wolfChoice === 'loneWolf') {
      if (lowestWolfScore < lowestOpponentScore) {
        wolfPoints = state.rules.loneWolfWin.wolf;
        opponentPoints = state.rules.loneWolfWin.opponents;
      } else if (lowestWolfScore > lowestOpponentScore) {
        wolfPoints = state.rules.loneWolfLose.wolf;
        opponentPoints = state.rules.loneWolfLose.opponents;
      } else {
        wolfPoints = state.rules.loneWolfTie.wolf;
        opponentPoints = state.rules.loneWolfTie.opponents;
      }
    } else { // wolfWithPartner
      if (lowestWolfScore < lowestOpponentScore) {
        wolfPoints = state.rules.wolfWithPartnerWin.wolf;
        opponentPoints = state.rules.wolfWithPartnerWin.opponents;
      } else if (lowestWolfScore > lowestOpponentScore) {
        wolfPoints = state.rules.wolfWithPartnerLose.wolf;
        opponentPoints = state.rules.wolfWithPartnerLose.opponents;
      } else {
        wolfPoints = state.rules.wolfWithPartnerTie.wolf;
        opponentPoints = state.rules.wolfWithPartnerTie.opponents;
      }
    }

    console.log(`Calculated Points - Wolf: ${wolfPoints}, Opponents: ${opponentPoints}`);

    return { wolfPoints, opponentPoints };
  };
 

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


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
    handleCalculatePoints();
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
      const calculateTotalPoints = (player, upToHole) => {
        return Object.entries(state.points)
          .filter(([hole]) => parseInt(hole) <= upToHole)
          .reduce((sum, [, holePoints]) => sum + (holePoints[player] || 0), 0);
      };
  
      const sortPlayers = (upToHole) => {
        return [...state.players].sort((a, b) => {
          return calculateTotalPoints(b, upToHole) - calculateTotalPoints(a, upToHole);
        });
      };
  
      setTeeOrder((prevTeeOrder) => {
        const newTeeOrder = [...prevTeeOrder];
        newTeeOrder[16] = sortPlayers(16); // Sort based on first 16 holes
        newTeeOrder[17] = sortPlayers(17); // Sort based on first 17 holes
        return newTeeOrder;
      });
    }
  }, [state.currentHole, state.points, state.players]);




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


    // const { wolfPoints, opponentPoints } = calculatePoints(currentChoice.choice, wolfScores, opponentScores, state.rules);
    const { wolfPoints, opponentPoints } = calculatePoints(currentChoice.choice, wolfScores, opponentScores);

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
    <div className="py-4 h-screen bg-slate-800 text-gray-300">
      {!state.gameStarted ? (
        <div className="p-4 flex flex-col justify-center items-center gap-16 ">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-bold text-3xl">Wolf</h1>
            <h2>Enter 4 player names</h2>
          </div>
          <PlayerInput
            newPlayer={newPlayer}
            handlePlayerNameChange={handlePlayerNameChange}
            handleAddPlayer={handleAddPlayer}
            handleDeletePlayer={handleDeletePlayer}
            handleStartGame={handleStartGame}
          />
          <ul className="flex flex-col gap-16">
            {state.players.map((player, index) => (
              <li className="flex justify-between items-center gap-24" key={index}>
               <span className="text-xl">{player}</span> <button className="border border-gray-300 rounded py-1 px-2" onClick={() => handleDeletePlayer(index)}>Delete</button>
              </li>
            ))}
          </ul>
          {state.players.length === 4 && (
            <button className="border border-gray-300 rounded py-2 px-4 text-2xl my-6"  onClick={handleStartGame}>Start Game</button>
          )}
        </div>
      ) : (
        <div className="px-8 py-6 h-full flex flex-col items-center gap-8">
          <WolfChoice
            currentHole={state.currentHole}
            players={state.players}
            wolfChoices={state.wolfChoices}
            handleWolfChoiceChange={handleWolfChoiceChange}
            // teeOrder={teeOrder}
            teeOrder={teeOrder[state.currentHole - 1] || state.players}
            // teeOrder={getCurrentTeeOrder()}
            // handleTeamsUpdate={handleTeamsUpdate}
            strokes={state.strokes[state.currentHole] || {}}
            onStrokeChange={handleStrokeChange}
          />
          
          <div className=" flex flex-col gap-4">
            {teeOrder[state.currentHole - 1] && teeOrder[state.currentHole - 1].map((player, index) => (
              <div key={player} className="flex items-center justify-between gap-24">
                <span className="text-xl">{player}:</span>
                <div className="flex items-center space-x-2 mb-2 mr-4">
                  <button 
                    className="px-2 bg-gray-500 text-white rounded"
                    onClick={() => handleStrokeChange(player, (getCurrentHoleStrokes()[player] || 0) - 1)}
                  >
                    -
                  </button>
                  <input
                    className="text-black rounded w-12 text-center"
                    type="number"
                    value={getCurrentHoleStrokes()[player] || ''}
                    onChange={(e) => handleStrokeChange(player, parseInt(e.target.value) || '')}
                  />
                  <button 
                    className="px-2 bg-gray-500 text-white rounded"
                    onClick={() => handleStrokeChange(player, (getCurrentHoleStrokes()[player] || 0) + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div> 
          

          <button
            className="bg-gray-300 text-sky-950 h-16 px-2 rounded"
            onClick={toggleModal}
          >
            View Scorecard/Pointscard
          </button>

          <ScoreModal
            isOpen={isModalOpen}
            onClose={toggleModal}
            // showScorecard={showScorecard}
            players={state.players}
            strokes={state.strokes}
            points={state.points}
            currentHole={state.currentHole}
            onStrokeChange={handleStrokeChange}
            onPointsChange={handlePointsChange}
          />
        

          <div className="w-full flex items-center justify-between mt-6">
            <button className="border border-gray-300 rounded px-2 py-1 w-36 h-10" onClick={() => handleHoleChange(-1)} disabled={state.currentHole === 1}>Previous Hole</button>
            <span className="mx-2 text-center">Hole {state.currentHole}</span>
            <button className="border border-grey-300 rounded px-2 py-1 w-36 h-10" onClick={() => handleHoleChange(1)} disabled={state.currentHole === 18}>Next Hole</button>
          </div>
        </div>
      )}
    </div>
  );

}

export default App
