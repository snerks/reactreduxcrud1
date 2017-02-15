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
    // kind: '',
    // area: 0
    items: []
};

// export interface SquareAction {
//     type: ShapeActions.SquareActionType;
//     size: number;
// }

// interface RectangleAction {
//     type: ShapeActions.RectangleActionType;
//     width: number;
//     height: number;
// }

// interface CircleAction {
//     type: ShapeActions.CircleActionType;
//     radius: number;
// }

// interface TriangleAction {
//     type: ShapeActions.TriangleActionType;
//     base: number;
//     height: number;
// }

interface SetGamesAction {
    type: GamesActions.SetGamesActionType;
    games: Game[];
}

interface OtherAction {
    type: GamesActions.OtherActionType;
}

const otherActionInstance: OtherAction = {
    type: GamesActions.OtherActionTypeValue
};

type GamesAction =
    SetGamesAction |
    OtherAction;

export default function games(
    state: GamesState = initialGamesState,
    action: GamesAction = otherActionInstance): GamesState {

    switch (action.type) {
        // case ShapeActions.SquareActionTypeValue:
        //     return { kind: action.type, area: action.size * action.size };

        // case ShapeActions.RectangleActionTypeValue:
        //     return { kind: action.type, area: action.width * action.height };

        // case ShapeActions.CircleActionTypeValue:
        //     return { kind: action.type, area: Math.PI * action.radius * action.radius };

        // case ShapeActions.TriangleActionTypeValue:
        //     return { kind: action.type, area: action.base / 2 * action.height };

        case GamesActions.SetGamesActionTypeValue:
            return { items: action.games };

        default:
            return state;
    }
}
