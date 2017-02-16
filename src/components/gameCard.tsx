import * as React from 'react';

import { Game } from '../reducers/games';

interface GameCardProps {
    game: Game;
}

const GameCard: React.SFC<GameCardProps> = ({ game }) => {
    return (
        <div className="ui card">

            <div className="image">
                <img src={game.cover} alt="Game Cover" />
            </div>
            <div className="content">
                <div className="header">{game.title}</div>
            </div>

        </div>
    );
};

export default GameCard;