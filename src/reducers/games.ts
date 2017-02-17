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

interface GameFetchedAction {
    type: GamesActions.GameFetchedActionType;
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
    GameFetchedAction |
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

        case GamesActions.GameFetchedActionTypeValue:
            const index = state.items.findIndex(item => item._id === action.game._id);

            if (index > -1) {
                const newItems = state.items.map(item => {
                    if (item._id === action.game._id) {
                        return action.game;
                    }

                    return item;
                });

                return {
                    items: newItems
                };
            } else {
                return {
                    items: [
                        ...state.items,
                        action.game
                    ]
                };
            }

        // tslint:disable-next-line:no-switch-case-fall-through
        default:
            return state;
    }
}
