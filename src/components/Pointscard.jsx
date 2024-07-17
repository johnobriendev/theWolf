import React from 'react';

const Pointscard = ({ players, points }) => {
  const getHolePoints = (hole) => {
    return players.map(player => points[hole]?.[player] || 0);
  };

  const calculateTotal = (holes) => {
    return players.map(player => 
      holes.reduce((sum, hole) => sum + (points[hole]?.[player] || 0), 0)
    );
  };

  const frontNineHoles = Array.from({ length: 9 }, (_, i) => i + 1);
  const backNineHoles = Array.from({ length: 9 }, (_, i) => i + 10);

  const frontNineTotals = calculateTotal(frontNineHoles);
  const backNineTotals = calculateTotal(backNineHoles);
  const overallTotals = frontNineTotals.map((total, i) => total + backNineTotals[i]);

  return (
    <div className="pointscard">
      <h2 className='font-semibold text-lg'>Pointscard</h2>

      {/* Table for Holes 1-9 */}
      <div className="points-table mt-5">
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
                <td className='font-light'>{player}</td>
                {frontNineHoles.map(hole => (
                  <td key={hole}>
                    {points[hole] && points[hole][player] !== undefined ? points[hole][player] : '-'}
                  </td>
                ))}
                <td>{frontNineTotals[playerIndex]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table for Holes 10-18 */}
      <div className="points-table mt-4">
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
                    {points[hole] && points[hole][player] !== undefined ? points[hole][player] : '-'}
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

export default Pointscard;



// const Pointscard = ({ players, points }) => {
//   return (
//     <div className="pointscard">
//       <h2>Points</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Hole</th>
//             {players.map(player => <th key={player}>{player}</th>)}
//           </tr>
//         </thead>
//         <tbody>
//           {[...Array(18)].map((_, holeIndex) => (
//             <tr key={holeIndex}>
//               <td>{holeIndex + 1}</td>
//               {players.map(player => (
//                 <td key={player}>
//                   {points[holeIndex + 1] && points[holeIndex + 1][player] !== undefined
//                     ? points[holeIndex + 1][player]
//                     : '-'}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };




// export default Pointscard;