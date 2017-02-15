import * as React from 'react';
import { connect } from 'react-redux';

import { fetchGames } from '../actions/gamesCreators';
import { Game } from '../reducers/games';

import { RootState } from '../store/rootState';
import GamesList from './gamesList';

interface GamesDataProps {
    games: Game[];
}

interface GamesDispatchProps {
    fetchGames: () => void;
}

type GamesProps = GamesDataProps & GamesDispatchProps;

class GamesPage extends React.Component<GamesProps, null> {
    componentDidMount() {
        this.props.fetchGames();
    }

    render() {
        return (
            <div>
                <h1>Games List</h1>

                <GamesList games={this.props.games} />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): GamesDataProps => ({
    games: state.games.items
});

export default connect(mapStateToProps, { fetchGames })(GamesPage as any);