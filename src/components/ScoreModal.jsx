import React from 'react';
import Scorecard from './Scorecard';
import Pointscard from './Pointscard';

const ScoreModal = ({ isOpen, onClose, players, strokes, points, currentHole, onStrokeChange, onPointsChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-800 text-gray-300 flex flex-col overflow-auto">
      <div className="py-4 px-12">
        <button onClick={onClose} className="float-right bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">Scorecard and Pointscard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
          <div>
            <Scorecard
              players={players}
              strokes={strokes}
              currentHole={currentHole}
              onStrokeChange={onStrokeChange}
            />
          </div>
          <div>
            <Pointscard
              players={players}
              points={points}
              currentHole={currentHole}
              onPointsChange={onPointsChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

  

export default ScoreModal;