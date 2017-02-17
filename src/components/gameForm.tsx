import * as React from 'react';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { saveGame, fetchGame, ErrorWithResponse } from '../actions/gamesCreators';
import { Game, PartialGame } from '../reducers/games';
import { RootState } from '../store/rootState';

export interface GameRouterParams {
    _id?: string;
}

export interface GameFormOwnProps {
    params?: GameRouterParams;
    game?: Game;
}

export interface GameFormDispatchProps {
    saveGame: (game: PartialGame) => any;
    fetchGame: (id: string) => any;
}

export type GameFormProps = GameFormOwnProps & GameFormDispatchProps;

export interface GameFormErrorState {
    title?: string;
    cover?: string;
    global?: string;
}

export interface GameFormState {
    _id: string | null;
    title: string;
    cover: string;
    errors: GameFormErrorState;
    loading: boolean;
    done: boolean;
}

class GameForm extends React.Component<GameFormProps, GameFormState> {

    constructor(props: GameFormProps) {
        super(props);

        const errorState: GameFormErrorState = {};

        this.state = {
            _id: props.game ? props.game!._id : null,
            title: props.game ? props.game!.title : '',
            cover: props.game ? props.game!.cover : '',
            errors: errorState,
            loading: false,
            done: false
        };
    }

    componentWillReceiveProps = (nextProps: any) => {
        this.setState({
            _id: nextProps.game._id,
            title: nextProps.game.title,
            cover: nextProps.game.cover,
        });
    }

    componentDidMount = () => {
        const routerProps: any = this.props;

        if (!routerProps.match) {
            return;
        }

        const { match } = routerProps;

        if (!match.params) {
            return;
        }

        const { params } = match;

        if (params && params._id) {
            this.props.fetchGame(params._id);
        }
    }

    handleChange: React.ChangeEventHandler<HTMLInputElement> = (e: any) => {
        const { target } = e;
        const { name, value } = target;

        if (!!this.state.errors[name]) {
            let errors = { ...this.state.errors };
            delete errors[name];

            this.setState({
                [name]: value,
                errors
            });
        } else {
            this.setState({ [name]: value });
        }
    }

    handleSubmit = (e: any) => {
        e.preventDefault();

        // validation
        let errors: GameFormErrorState = {};

        if (this.state.title === '') {
            errors = { ...errors, title: 'Cannot be empty' };
        }

        if (this.state.cover === '') {
            errors = { ...errors, cover: 'Cannot be empty' };
        }

        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            const { title, cover } = this.state;

            this.setState({ loading: true });

            this.props.saveGame({ title, cover }).then(
                // tslint:disable-next-line:no-empty
                () => {
                    this.setState({ done: true, loading: false });
                },
                (err: ErrorWithResponse) => {
                    if (!err.response) {
                        this.setState({ errors: { 'global': err.message }, loading: false });
                    }

                    err.response.json().then(
                        (responseFromJson: any) => {
                            if (responseFromJson.errors) {
                                this.setState({ errors: responseFromJson.errors, loading: false });
                            } else {
                                this.setState({ loading: false });
                            }
                        });
                }
            );
        }
    }

    render() {
        const form = (
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
                <h1>Add new Game</h1>

                {
                    !!this.state.errors.global &&
                    <div className="ui negative message"><p>{this.state.errors.global}</p></div>
                }

                <div className={classnames('field', { error: !!this.state.errors.title })}>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        id="title"
                        type="text"
                    />
                    <span>{this.state.errors.title}</span>
                </div>

                <div className={classnames('field', { error: !!this.state.errors.cover })}>
                    <label htmlFor="cover">Cover URL</label>
                    <input
                        name="cover"
                        value={this.state.cover}
                        onChange={this.handleChange}
                        id="cover"
                        type="text"
                    />
                    <span>{this.state.errors.cover}</span>
                </div>

                <div className="field">
                    {
                        this.state.cover !== '' && (
                            <img src={this.state.cover} alt="cover" className="ui small bordered image" />
                        )
                    }
                </div>

                <div className="field">
                    <button className="ui primary button">Save</button>
                </div>
            </form>
        );

        return (
            <div>
                {this.state.done ? <Redirect to="/games" /> : form}
            </div>
        );
    }
}

// const mapStateToProps = (state: RootState, reduxRrops: any): GameFormOwnProps => ({

//     // re

//     // if(reduxRrops.params._id) {
//     //     return {
//     //         game: state.games.items.find(item => item._id === reduxRrops.params._id)
//     //     };
//     // }
// });

function mapStateToProps(state: RootState, ownProps: any) {
    if (ownProps.match && ownProps.match.params && ownProps.match.params._id) {
        const matchedGame = state.games.items.find(item => item && item._id === ownProps.match.params!._id);
        return {
            game: matchedGame
        };
    }

    return { game: null };
}

export default connect(mapStateToProps, { saveGame, fetchGame })(GameForm as any);