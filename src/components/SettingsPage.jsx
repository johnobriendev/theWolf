import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRules } from '../contexts/RulesContext';

const SettingsPage = () => {
  const { rules, setRules } = useRules();
  const navigate = useNavigate();

  const handleRuleChange = (category, outcome, player, value) => {
    setRules(prevRules => ({
      ...prevRules,
      [category]: {
        ...prevRules[category],
        [player]: Math.max(0, value)
      }
    }));
  };

  const handleSave = () => {
    navigate('/');
  };

  return (
    <div className="p-4 bg-slate-800 min-h-screen text-gray-300">
      <h1 className="text-3xl font-bold mb-6">Game Settings</h1>
      <div className="flex flex-col gap-8">
        {Object.entries(rules).map(([category, players]) => (
          <div key={category} className="mb-6">
            <h2 className="text-2xl mb-4">{category}</h2>
            <div className="flex flex-col gap-4">
              {Object.entries(players).map(([player, points]) => (
                <div key={`${category}-${player}`} className="flex items-center justify-between gap-24">
                  <span className="text-xl">{`${player}`}:</span>
                  <div className="flex items-center space-x-2 mb-2 mr-4">
                    <button 
                      className="px-2 bg-gray-500 text-white rounded"
                      onClick={() => handleRuleChange(category, player, player, points - 1)}
                    >
                      -
                    </button>
                    <input
                      className="text-black rounded w-12 text-center"
                      type="number"
                      value={points}
                      onChange={(e) => handleRuleChange(category, player, player, parseInt(e.target.value) || 0)}
                    />
                    <button 
                      className="px-2 bg-gray-500 text-white rounded"
                      onClick={() => handleRuleChange(category, player, player, points + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSave} className="mt-8 bg-blue-500 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </div>
  );
};

export default SettingsPage;