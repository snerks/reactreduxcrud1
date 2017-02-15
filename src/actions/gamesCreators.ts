import * as GamesActions from '../actions/games';
import { Game } from '../reducers/games';

export function setGames(games: Game[]) {
    return {
        type: GamesActions.SetGamesActionTypeValue,
        games
    };
}

export function fetchGames() {
    return (dispatch: Function) => {
        fetch('/api/games')
            .then(res => res.json())
            .then(data => dispatch(setGames(data.games)));
    };
}