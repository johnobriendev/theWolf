import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="p-4 flex flex-col items-center gap-24 bg-slate-800 h-screen text-gray-300">
      <h1 className="text-4xl font-bold text-center mt-12">Wolf</h1>
      <div className="flex flex-col items-center gap-12">
        <Link to="/rules">
          <button className="border border-gray-300 rounded px-4 py-2">Rules</button>
        </Link>
        <Link to="/game">
          <button className="border border-gray-300 rounded px-4 py-2">Play Game</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;