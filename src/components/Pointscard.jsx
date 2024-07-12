const Pointscard = ({ players, points }) => {
  return (
    <div className="pointscard">
      <h3>Points</h3>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            {Object.keys(points).map(hole => (
              <th key={hole}>Hole {hole}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player, playerIndex) => (
            <tr key={player}>
              <td>{player}</td>
              {Object.keys(points).map(hole => (
                <td key={`${hole}-${player}`}>{points[hole][playerIndex]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pointscard;