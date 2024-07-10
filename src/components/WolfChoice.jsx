import React from "react";

const WolfChoice = ({currentHole, players, wolfChoices, handleWolfChoiceChange, teeOrder}) => {

  const wolfChoice = wolfChoices[currentHole] || { partner: '', blindWolf: false, loneWolf: true };
  const wolf = teeOrder[teeOrder.length - 1];


  // Handle wolf choice changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleWolfChoiceChange(currentHole, { ...wolfChoice, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    handleWolfChoiceChange(currentHole, {
      ...wolfChoice,
      blindWolf: name === 'blindWolf' ? checked : wolfChoice.blindWolf,
      loneWolf: name === 'loneWolf' ? checked : wolfChoice.loneWolf,
      partner: name === 'partner' ? '' : wolfChoice.partner
    });
  };

  return (
    <div className="wolf-choice">
      <h2>Hole {currentHole} Wolf Choice</h2>
      <div>
        <p>Wolf: {wolf}</p>
        <label>
          Partner:
          <select
            name="partner"
            value={wolfChoice.partner}
            onChange={handleChange}
            disabled={wolfChoice.blindWolf || wolfChoice.loneWolf}
          >
            {players
              .filter((player) => player!== wolf)
              .map((player, index) => (
                <option key={index} value={player}>
                  {player}
                </option>
              ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Blind Wolf:
          <input
            type="checkbox"
            name="blindWolf"
            checked={wolfChoice.blindWolf}
            onChange={handleCheckboxChange}
            disabled={wolfChoice.partner || wolfChoice.loneWolf}
          />
        </label>
      </div>
      <div>
        <label>
          Lone Wolf:
          <input
            type="checkbox"
            name="loneWolf"
            checked={wolfChoice.loneWolf}
            onChange={handleCheckboxChange}
            disabled={wolfChoice.partner || wolfChoice.blindWolf}
          />
        </label>
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