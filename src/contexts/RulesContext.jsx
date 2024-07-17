import React, { createContext, useState, useContext } from 'react';

const initialRules = {
  blindWolfWin: { wolf: 6, opponents: 0 },
  blindWolfLose: { wolf: 0, opponents: 2 },
  blindWolfTie: { wolf: 0, opponents: 0 },
  loneWolfWin: { wolf: 3, opponents: 0 },
  loneWolfLose: { wolf: 0, opponents: 1 },
  loneWolfTie: { wolf: 0, opponents: 0 },
  wolfWithPartnerWin: { wolf: 1, opponents: 0 },
  wolfWithPartnerLose: { wolf: 0, opponents: 2 },
  wolfWithPartnerTie: { wolf: 0, opponents: 0 },
};

const RulesContext = createContext();

export const RulesProvider = ({ children }) => {
  const [rules, setRules] = useState(initialRules);

  return (
    <RulesContext.Provider value={{ rules, setRules }}>
      {children}
    </RulesContext.Provider>
  );
};

export const useRules = () => useContext(RulesContext);