import * as React from 'react';
import * as classnames from 'classnames';
import { connect } from 'react-redux';

import { saveGame, ErrorWithResponse } from '../actions/gamesCreators';
import { PartialGame } from '../reducers/games';
import { RootState } from '../store/rootState';

export interface GameFormOwnProps {

}

export interface GameFormDispatchProps {
    saveGame: (game: PartialGame) => any;
}

export type GameFormProps = GameFormOwnProps & GameFormDispatchProps;

export interface GameFormErrorState {
    title?: string;
    cover?: string;
    global?: string;
}

export interface GameFormState {
    title: string;
    cover: string;
    errors: GameFormErrorState;
    loading: boolean;
}

class GameForm extends React.Component<GameFormProps, GameFormState> {

    constructor(props: GameFormProps) {
        super(props);

        const errorState: GameFormErrorState = {};

        this.state = {
            title: '',
            cover: '',
            errors: errorState,
            loading: false
        };
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
                () => { },
                (err: ErrorWithResponse) => {
                    err.response.json().then(
                        (responseAsJson: any) => {
                            if (responseAsJson.errors) {
                                this.setState({ errors: responseAsJson.errors, loading: false });
                            } else {
                                this.setState({ loading: false });
                            }
                        });
                }
            );
        }
    }

    render() {
        return (
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
    }
}

const mapStateToProps = (state: RootState): GameFormOwnProps => ({
});

export default connect(mapStateToProps, { saveGame })(GameForm);