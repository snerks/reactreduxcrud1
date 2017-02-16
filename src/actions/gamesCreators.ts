import * as GamesActions from '../actions/games';
import { Game, PartialGame } from '../reducers/games';

export interface ErrorResponse {
    response?: any;
}

export type ErrorWithResponse = Error & ErrorResponse;

function handleResponse(response: any) {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText) as ErrorWithResponse;
        error.response = response;
        throw error;
    }
}

export function setGames(games: Game[]) {
    return {
        type: GamesActions.SetGamesActionTypeValue,
        games
    };
}

function addGame(game: PartialGame) {
    return {
        type: GamesActions.AddGameActionTypeValue,
        game
    };
}

export function saveGame(game: PartialGame) {
    // return {
    //     type: GamesActions.SaveGameActionTypeValue,
    //     game
    // };
    return (dispatch: Function) => {
        return fetch('/api/games', {
            method: 'post',
            body: JSON.stringify(game),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(handleResponse)
            .then((data: any) => dispatch(addGame(data.game)));
    };
}

export function fetchGames() {
    return (dispatch: Function) => {
        fetch('/api/games')
            .then(res => res.json())
            .then(data => dispatch(setGames(data.games)));
    };
}