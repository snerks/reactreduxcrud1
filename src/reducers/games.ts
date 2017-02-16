import * as GamesActions from '../actions/games';

export interface Game {
    _id: string;
    title: string;
    cover: string;
}

export type PartialGame = Partial<Game>;

export interface GamesState {
    items: Game[];
}

export const initialGamesState: GamesState = {
    items: []
};

interface SetGamesAction {
    type: GamesActions.SetGamesActionType;
    games: Game[];
}

interface AddGameAction {
    type: GamesActions.AddGameActionType;
    game: Game;
}

interface OtherAction {
    type: GamesActions.OtherActionType;
}

const otherActionInstance: OtherAction = {
    type: GamesActions.OtherActionTypeValue
};

type GamesAction =
    SetGamesAction |
    AddGameAction |
    OtherAction;

export default function games(
    state: GamesState = initialGamesState,
    action: GamesAction = otherActionInstance): GamesState {

    switch (action.type) {
        case GamesActions.SetGamesActionTypeValue:
            return { items: action.games };

        case GamesActions.AddGameActionTypeValue:
            return {
                items: [
                    ...state.items,
                    action.game
                ]
            };

        default:
            return state;
    }
}
