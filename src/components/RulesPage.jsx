import React from 'react';
import { Link } from 'react-router-dom';

const RulesPage = () => {
  return (
    <div className="p-4 bg-slate-800 text-gray-300 font-light leading-loose h-full">
      <Link to={'/'}>Home</Link>
      <h1 className="text-3xl font-bold mb-4 text-center">Rules</h1>
     <div className='mx-8 '>
      <p className='mb-5'>Wolf is played with four players, where all players play independently. The objective of the game is to be the player with the most points at the end of the round.</p>
        <p className='mb-5'>Before the first hole, the order of play is decided by drawing or by flipping a tee. The 'Wolf' is always the last player to tee off. At each hole, the players rotate the tee-off order (on the first hole 1,2,3,4 and on the second hole 4,1,2,3 and on fifth hole 1,2,3,4 again) so that each player becomes Wolf once every four holes. On the 17th and 18th holes the Players play in order of points with the person with the least points going last and getting a change to be wolf again..</p>
        <p className='mb-5'>After the tee shot of each player, the Wolf decides whether or not to take that player on his/her team. Or, after all three other players have teed off, the Wolf can play as a 'Lone Wolf' if they feel they can beat all three other players. As the Lone Wolf, the player plays alone and tries to shoot the lowest score on the hole. The Wolf can also decide to go Blind Wolf and play alone before viewing any of the other players tee off.</p>
        <p className='mb-5'>If the Wolf and their partner win the hole, they each receive 1 point.</p>
        <p className='mb-5'>If the non-Wolf partners win the hole, they each receive 2 points.</p>
        <p className='mb-5'>If the Lone Wolf beats all the other players they receive 3 points.</p>
        <p className='mb-5'>If another player beats the Lone Wolf on a hole, all players - except the Lone Wolf - receive 1 point.</p>
        <p className='mb-5'>If the Wolf goes blind and wins, they are awarded 6 points, otherwise the opponents are awarded 2 each.</p>
        <p className='mb-5'>As with most golf games, each group may have their own modifications to the rules. Feel free to make adjustments to the points awarded in the settings tab.</p>
     </div>
     
      
    </div>
  );
};

export default RulesPage;