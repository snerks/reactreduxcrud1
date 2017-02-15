import * as React from 'react';

import { Game } from '../reducers/games';

interface GamesListProps {
    games: Game[];
}

const GamesList: React.SFC<GamesListProps> = ({ games }) => {
    const emptyListMessage = (
        <p>There are no games yet.</p>
    );

    const gamesUl = games.map((game: Game) => <li key={game._id}>{game.title}</li>);

    const gamesList = (
        <div>
            <p>Games List</p>

            {gamesUl}
        </div>
    );

    return (
        <div>
            {games.length === 0 ? emptyListMessage : gamesList}
        </div>
    );
};

export default GamesList;