import * as React from 'react';
// // import classNames from require('classnames').classames;
// const classnames: Function = require('classnames').classnames;
import * as classnames from 'classnames';

export interface GameFormProps {

}

export interface GameFormErrorState {
    title?: string;
    cover?: string;
}

export interface GameFormState {
    title: string;
    cover: string;
    errors: GameFormErrorState;
}

class GameForm extends React.Component<GameFormProps, GameFormState> {

    constructor(props: GameFormProps) {
        super(props);

        const errorState: GameFormErrorState = {};

        this.state = {
            title: '',
            cover: '',
            errors: errorState
        };
    }

    // handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    //     const { target } = e;
    //     const { name, value } = target;

    //     this.setState({
    //         [name]: value
    //     });
    // }

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
    }

    render() {
        return (
            <form className="ui form" onSubmit={this.handleSubmit}>
                <h1>Add new Game</h1>

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

export default GameForm;