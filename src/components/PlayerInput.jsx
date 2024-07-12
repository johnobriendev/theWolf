import React from "react";

const PlayerInput = ({newPlayer, handlePlayerNameChange, handleAddPlayer}) =>(
  <div className="flex justify-between items-center gap-5">
    <input 
    className="border border-gray-300 p-1 rounded placeholder-black text-black"
    type="text"
    value={newPlayer}
    onChange={handlePlayerNameChange}
    placeholder="Enter player name"
    />
    <button className="border border-gray-300 rounded py-1 px-2" onClick={handleAddPlayer}>Add Player</button>
  </div>
);

export default PlayerInput;