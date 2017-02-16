import * as React from 'react';

import { Game } from '../reducers/games';
import GameCard from './gameCard';

interface GamesListProps {
    games: Game[];
}

const GamesList: React.SFC<GamesListProps> = ({ games }) => {
    const emptyListMessage = (
        <p>There are no games yet.</p>
    );

    const gamesList = (
        <div className="ui four cards">
            {games.map((game: Game) => <GameCard key={game._id} game={game} />)}
        </div>
    );

    return (
        <div>
            {games.length === 0 ? emptyListMessage : gamesList}
        </div>
    );
};

export default GamesList;