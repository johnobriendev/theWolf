import React, { useState } from 'react';

const Rules = ({ rules, handleRuleChange }) => {
  const [localRules, setLocalRules] = useState(rules);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [rule, key] = name.split('.');

    setLocalRules((prevRules) => ({
      ...prevRules,
      [rule]: {
        ...prevRules[rule],
        [key]: parseInt(value, 10)
      }
    }));
  };

  const handleSave = () => {
    handleRuleChange(localRules);
  };

  return (
    <div className="rules">
      <h2>Set Game Rules</h2>
      {Object.keys(localRules).map((rule) => (
        <div key={rule} className="rule-section">
          <h3>{rule.replace(/([A-Z])/g, ' $1')}</h3>
          <label>
            Wolf:
            <input
              type="number"
              name={`${rule}.wolf`}
              value={localRules[rule].wolf}
              onChange={handleChange}
            />
          </label>
          <label>
            Opponents:
            <input
              type="number"
              name={`${rule}.opponents`}
              value={localRules[rule].opponents}
              onChange={handleChange}
            />
          </label>
        </div>
      ))}
      <button onClick={handleSave}>Save Rules</button>
    </div>
  );
};

export default Rules;