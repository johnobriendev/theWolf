import React from "react";

const WolfChoice = ({currentHole, players, wolfChoices, handleWolfChoiceChange}) => {

  const wolfChoice = wolfChoices[currentHole] || { partner: '', blindWolf: false, loneWolf: false };


  const getCurrentWolf = () => {
    if (currentHole === 17 || currentHole === 18) {
      // Sort players by points for holes 17 and 18
      const sortedByPoints = Object.entries(players)
        .map(([idx, _]) => ({ idx, points: Object.values(wolfChoices).reduce((acc, c) => acc + (c[idx] || 0), 0) }))
        .sort((a, b) => a.points - b.points);
      return sortedByPoints[0]?.idx; // Get player with the lowest points
    } else {
      const holeOrder = (currentHole - 1) % players.length;
      return (holeOrder + players.length - 1) % players.length; // Calculate the wolf based on the order
    }
  };

  const wolfIndex = getCurrentWolf();
  const wolf = players[wolfIndex];

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
            <option value="">None</option>
            {players
              .filter((_, index) => index !== wolfIndex)
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
    </div>
  );
}

export default WolfChoice;