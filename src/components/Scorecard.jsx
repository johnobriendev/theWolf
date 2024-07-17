import React from 'react';

const Scorecard = ({ players, strokes }) => {
  const getHoleScores = (hole) => {
    return players.map(player => strokes[hole]?.[player] || 0);
  };

  const calculateTotal = (holes) => {
    return players.map(player => 
      holes.reduce((sum, hole) => sum + (strokes[hole]?.[player] || 0), 0)
    );
  };

  const frontNineHoles = Array.from({ length: 9 }, (_, i) => i + 1);
  const backNineHoles = Array.from({ length: 9 }, (_, i) => i + 10);

  const frontNineTotals = calculateTotal(frontNineHoles);
  const backNineTotals = calculateTotal(backNineHoles);
  const overallTotals = frontNineTotals.map((total, i) => total + backNineTotals[i]);

  return (
    <div className="scorecard">
      <h3 className='font-semibold text-lg'>Scorecard</h3>

      {/* Table for Holes 1-9 */}
      <div className="score-table mt-5">
        <table className='w-full text-xl'>
          <thead>
            <tr>
              <th className='font-light'>Player</th>
              {frontNineHoles.map(hole => (
                <th className='font-light' key={hole}>{hole}</th>
              ))}
              <th className='font-light'>F9</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, playerIndex) => (
              <tr key={player}>
                <td>{player}</td>
                {frontNineHoles.map(hole => (
                  <td key={hole}>
                    {strokes[hole] && strokes[hole][player] !== undefined ? strokes[hole][player] : '-' }
                  </td>
                ))}
                <td>{frontNineTotals[playerIndex]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table for Holes 10-18 */}
      <div className="score-table mt-4">
        <table className='w-full text-xl'>
          <thead>
            <tr>
              <th className='font-light'>Player</th>
              {backNineHoles.map(hole => (
                <th className='font-light' key={hole}>{hole}</th>
              ))}
              <th className='font-light'>B9</th>
              <th className='font-light'>Total</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, playerIndex) => (
              <tr key={player}>
                <td className='font-light'>{player}</td>
                {backNineHoles.map(hole => (
                  <td key={hole}>
                    {strokes[hole] && strokes[hole][player] !== undefined ? strokes[hole][player] : '-'}
                  </td>
                ))}
                <td>{backNineTotals[playerIndex]}</td>
                <td>{overallTotals[playerIndex]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default Scorecard;