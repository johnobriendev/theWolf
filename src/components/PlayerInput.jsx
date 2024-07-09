import React from "react";

const PlayerInput = ({newPlayer, handlePlayerNameChange, handleAddPlayer}) =>(
  <div>
    <input 
    type="text"
    value={newPlayer}
    onChange={handlePlayerNameChange}
    placeholder="Enter player name"
    />
    <button onClick={handleAddPlayer}>Add Player</button>
  </div>
);

export default PlayerInput;