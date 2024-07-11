import React from 'react';

const PointsCard = ({ players, points }) => {
  const calculateTotal = (points, playerIndex, startHole, endHole) => {
    return Object.values(points)
      .slice(startHole - 1, endHole)
      .reduce((total, holePoints) => total + (holePoints[playerIndex] || 0), 0);
  };

  return (
    <div>
      <h3>Points Card</h3>
      {/* Table for Holes 1-9 */}
      <table className='top-table'>
        <thead>
          <tr>
            <th>Player</th>
            {[...Array(9)].map((_, i) => (
              <th key={i}>{i + 1}</th>
            ))}
            <th>F9</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, playerIndex) => (
            <tr key={playerIndex}>
              <td>{player}</td>
              {[...Array(9)].map((_, holeIndex) => (
                <td key={holeIndex}>
                  {points[holeIndex + 1] ? points[holeIndex + 1][playerIndex] : 0}
                </td>
              ))}
              <td>
                {calculateTotal(points, playerIndex, 1, 9)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Table for Holes 10-18 */}
      <table className='bottom-table'>
        <thead>
          <tr>
            <th>Player</th>
            {[...Array(9)].map((_, i) => (
              <th key={i}>{i + 10}</th>
            ))}
            <th>B9</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, playerIndex) => (
            <tr key={playerIndex}>
              <td>{player}</td>
              {[...Array(9)].map((_, holeIndex) => (
                <td key={holeIndex}>
                  {points[holeIndex + 10] ? points[holeIndex + 10][playerIndex] : 0}
                </td>
              ))}
              <td>
                {calculateTotal(points, playerIndex, 10, 18)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PointsCard;


// import React from 'react';

// const PointsCard = ({ players, points }) => {
//   const calculateTotal = (points, playerIndex, startHole, endHole) => {
//     return Object.values(points)
//       .slice(startHole - 1, endHole)
//       .reduce((total, holePoints) => total + (holePoints[playerIndex] || 0), 0);
//   };

//   return (
//     <div>
//       <h3>Points Card</h3>
//       {/* Table for Holes 1-9 */}
//       <table className='top-table'>
//         <thead>
//           <tr>
//             <th>Player</th>
//             {[...Array(9)].map((_, i) => (
//               <th key={i}>{i + 1}</th>
//             ))}
//             <th>F9</th>
//           </tr>
//         </thead>
//         <tbody>
//           {players.map((player, playerIndex) => (
//             <tr key={playerIndex}>
//               <td>{player}</td>
//               {[...Array(9)].map((_, holeIndex) => (
//                 <td key={holeIndex}>
//                   {points[holeIndex + 1] ? points[holeIndex + 1][playerIndex] : 0}
//                 </td>
//               ))}
//               <td>
//                 {calculateTotal(points, playerIndex, 1, 9)}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Table for Holes 10-18 */}
//       <table className='bottom-table'>
//         <thead>
//           <tr>
//             <th>Player</th>
//             {[...Array(9)].map((_, i) => (
//               <th key={i}>{i + 10}</th>
//             ))}
//             <th>B9</th>
//           </tr>
//         </thead>
//         <tbody>
//           {players.map((player, playerIndex) => (
//             <tr key={playerIndex}>
//               <td>{player}</td>
//               {[...Array(9)].map((_, holeIndex) => (
//                 <td key={holeIndex}>
//                   {points[holeIndex + 10] ? points[holeIndex + 10][playerIndex] : 0}
//                 </td>
//               ))}
//               <td>
//                 {calculateTotal(points, playerIndex, 10, 18)}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PointsCard;