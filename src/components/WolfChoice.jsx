import React from "react";
import { useState, useEffect, useMemo } from "react";

const WolfChoice = ({currentHole, players, wolfChoices, handleWolfChoiceChange, teeOrder, }) => {
  
  const wolfChoice = wolfChoices[currentHole] || { partner: '', blindWolf: false, choice: '' };
  //const wolf = teeOrder[teeOrder.length - 1];
  const wolf = teeOrder?.[teeOrder.length - 1] || players[players.length - 1];


  // Handle wolf choice changes
  const handleChange = (e) => {
    const { value } = e.target;
    handleWolfChoiceChange(currentHole, { choice: value });
  };


  const teams = useMemo(() => {
    let wolfTeam = [wolf];
    let opponents = players.filter(player => player !== wolf);

    if (wolfChoice.choice !== 'loneWolf' && wolfChoice.choice !== 'blindWolf') {
      const partner = wolfChoice.choice;
      wolfTeam.push(partner);
      opponents = players.filter(player => player !== wolf && player !== partner);
    }

    return { wolfTeam, opponents };
  }, [wolf, players, wolfChoice.choice]);



  return (
    <div className="">
      <div>
        <h1 className="text-xl font-bold text-center">Hole {currentHole} : {wolf} is the Wolf</h1>
        <div className="flex justify-around mt-1 text-sm">
          <div>
            <h3 className="font-semibold">Order</h3>
            <ul>
              {(teeOrder || players).map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Wolf Team</h4>
            <ul>
              {teams.wolfTeam.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Opponents</h4>
            <ul>
              {teams.opponents.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-between mt-4 text-sm">
          <div className="flex flex-col gap-2">
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
          </div>
          <div className="flex flex-col gap-2">
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
      </div>
      
      
    </div>
  );
}

export default WolfChoice;