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
      <h3>Scorecard</h3>

      {/* Table for Holes 1-9 */}
      <div className="score-table">
        <h4>Front Nine</h4>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              {frontNineHoles.map(hole => (
                <th key={hole}>{hole}</th>
              ))}
              <th>F9</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, playerIndex) => (
              <tr key={player}>
                <td>{player}</td>
                {frontNineHoles.map(hole => (
                  <td key={hole}>
                    {strokes[hole] && strokes[hole][player]}
                  </td>
                ))}
                <td>{frontNineTotals[playerIndex]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table for Holes 10-18 */}
      <div className="score-table">
        <h4>Back Nine</h4>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              {backNineHoles.map(hole => (
                <th key={hole}>{hole}</th>
              ))}
              <th>B9</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, playerIndex) => (
              <tr key={player}>
                <td>{player}</td>
                {backNineHoles.map(hole => (
                  <td key={hole}>
                    {strokes[hole] && strokes[hole][player]}
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



  // return (
  //   <div className="scorecard">
  //     <h3>Scorecard</h3>
  //     <div className="score-table">
  //       <h4>Front Nine</h4>
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Player</th>
  //             {frontNineHoles.map(hole => (
  //               <th key={hole}>Hole {hole}</th>
  //             ))}
  //             <th>Total</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {players.map((player, i) => (
  //             <tr key={player}>
  //               <td>{player}</td>
  //               {getHoleScores(frontNineHoles).map((score, j) => (
  //                 <td key={j}>{score[i]}</td>
  //               ))}
  //               <td>{frontNineTotals[i]}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //     <div className="score-table">
  //       <h4>Back Nine</h4>
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Player</th>
  //             {backNineHoles.map(hole => (
  //               <th key={hole}>Hole {hole}</th>
  //             ))}
  //             <th>Total</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {players.map((player, i) => (
  //             <tr key={player}>
  //               <td>{player}</td>
  //               {getHoleScores(backNineHoles).map((score, j) => (
  //                 <td key={j}>{score[i]}</td>
  //               ))}
  //               <td>{backNineTotals[i]}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //     <div className="score-table">
  //       <h4>Overall Total</h4>
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Player</th>
  //             <th>Total</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {players.map((player, i) => (
  //             <tr key={player}>
  //               <td>{player}</td>
  //               <td>{overallTotals[i]}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
};

export default Scorecard;