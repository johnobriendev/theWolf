import React from "react";
import { useState, useEffect } from "react";

const WolfChoice = ({currentHole, players, wolfChoices, handleWolfChoiceChange, teeOrder}) => {
  const [teams, setTeams] = useState({ wolfTeam: [], opponents: [] });

  const wolfChoice = wolfChoices[currentHole] || { partner: '', blindWolf: false, choice: 'loneWolf' };
  const wolf = teeOrder[teeOrder.length - 1];


  // Handle wolf choice changes
  const handleChange = (e) => {
    const { value } = e.target;
    handleWolfChoiceChange(currentHole, { choice: value });
  };


  // Function to separate players into teams
  const separateTeams = () => {
    let wolfTeam = [wolf];
    let opponents = players.filter(player => player !== wolf);

    if (wolfChoice.choice !== 'loneWolf' && wolfChoice.choice !== 'blindWolf') {
      const partner = wolfChoice.choice;
      wolfTeam.push(partner);
      opponents = players.filter(player => player !== wolf && player !== partner);
    }

    setTeams({ wolfTeam, opponents });
  };

  // Separate teams whenever the wolf choice changes
  useEffect(() => {
    separateTeams();
  }, [wolfChoice]);



  return (
    <div className="wolf-choice">
      <h2>Hole {currentHole} Wolf Choice</h2>
      <div>
        <p>Wolf: {wolf}</p>
        <div>
          <label>
            <input
              type="radio"
              name="wolfChoice"
              value="loneWolf"
              checked={wolfChoice.choice === 'loneWolf'}
              onChange={handleChange}
            />
            Lone Wolf
          </label>
          <label>
            <input
              type="radio"
              name="wolfChoice"
              value="blindWolf"
              checked={wolfChoice.choice === 'blindWolf'}
              onChange={handleChange}
            />
            Blind Wolf
          </label>
          {players
            .filter((player) => player !== wolf)
            .map((player, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="wolfChoice"
                  value={player}
                  checked={wolfChoice.choice === player}
                  onChange={handleChange}
                />
                Pick {player} as partner
              </label>
            ))}
        </div>
      </div>
      <div>
        <h3>Tee Order</h3>
        <ul>
          {teeOrder.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Teams</h3>
        <div>
          <h4>Wolf Team</h4>
          <ul>
            {teams.wolfTeam.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Opponents</h4>
          <ul>
            {teams.opponents.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WolfChoice;