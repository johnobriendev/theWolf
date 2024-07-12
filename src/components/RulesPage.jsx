import React from 'react';
import { Link } from 'react-router-dom';

const RulesPage = () => {
  return (
    <div className="p-4 bg-slate-800 text-gray-300">
      <Link to={'/'}>Home</Link>
      <h1 className="text-3xl font-bold mb-4 text-center">Rules</h1>
     <div className='mx-8'>
      <p className='text-center'>Wolf is played with four players, where all players play independently. The objective of the game is to be the player with the most points at the end of the round.</p>
        <p className='text-center'>Before the first hole, the order of play is decided by drawing or by flipping a tee. The 'Wolf' is always the last player to tee off. At each hole, the players rotate the tee-off order (on the first hole 1,2,3,4 and on the second hole 2,3,4,1 and on fifth hole 1,2,3,4 again) so that each player becomes Wolf once every four holes. On the 17th and 18th holes the first and second players are Wolf, respectively.</p>
        <p className='text-center'>After the tee shot of each player, the Wolf decides whether or not to take that player on his/her team. Or, after all three other players have teed off, the Wolf can play as a 'Lone Wolf' if they feel they can beat all three other players. As the Lone Wolf, the player plays alone and tries to shoot the lowest NET score on the hole. Otherwise, each hole is played NET best ball (only the best score of each team counts) with scoring as follows:</p>
        <p className='text-center'>If the Wolf and their partner win the hole, they each receive 2 points.</p>
        <p className='text-center'>If the non-Wolf partners win the hole, they each receive 3 points.</p>
        <p className='text-center'>If the Lone Wolf beats all the other players (shoots the lowest NET score), he/she receives 4 points.</p>
        <p className='text-center'>If another player beats the Lone Wolf on a hole, all players - except the Lone Wolf - receive 1 point.</p>
        <p className='text-center'>Consider this example: On the first hole, a tee is tossed and Jack is chosen as Wolf (designated by the red W). After Tom hits his drive, Jack chooses him to be his partner (designated by the blue WP). Jack shoots the low NET score of 4, and thus he and Tom each receive 2 points. On the second hole, Sharm is Wolf and he chooses Jack to be his partner. But it is Tom who shoots the low NET score this time, thus both Tom and Grover earn 3 points. On the third hole Tom is Wolf, and after watching the other players' tee shots he chooses to go Lone Wolf. As Lone Wolf, Tom shoots the lowest Net score on the hole, and thus earns 4 points. Three more holes are illustrated below, see if you can figure out how they played out.</p>
     </div>
     
      
    </div>
  );
};

export default RulesPage;