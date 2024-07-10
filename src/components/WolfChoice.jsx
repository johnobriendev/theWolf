import React from "react";

const WolfChoice = ({currentHole, players, wolfChoices, handleWolfChoiceChange, teeOrder}) => {

  const wolfChoice = wolfChoices[currentHole] || { partner: '', blindWolf: false, loneWolf: true };
  const wolf = teeOrder[teeOrder.length - 1];


  // Handle wolf choice changes
  const handleChange = (e) => {
    const { value } = e.target;
    handleWolfChoiceChange(currentHole, { choice: value });
  };



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
    </div>
  );
}

export default WolfChoice;