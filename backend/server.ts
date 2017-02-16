import express = require('express');
import mongodb = require('mongodb');
import * as bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const dbUrl: string = 'mongodb://127.0.0.1:27017/crudewithredux';

export interface Game {
    _id: string;
    title: string;
    cover: string;
}

export type PartialGame = Partial<Game>;

export interface GameFormErrorState {
    title?: string;
    cover?: string;
    global?: string;
}

interface ValidateResult {
    errors: GameFormErrorState;
    isValid: boolean;
}

function validate(data: PartialGame): ValidateResult {
    let errors: GameFormErrorState = {};

    if (data.title === '') {
        errors = { ...errors, title: 'Cannot be empty' };
    }

    if (data.cover === '') {
        errors = { ...errors, cover: 'Cannot be empty' };
    }

    const isValid = Object.keys(errors).length === 0;

    return { errors, isValid };
}

mongodb.MongoClient.connect(dbUrl, (err: mongodb.MongoError, db: mongodb.Db) => {

    app.get('/api/games/', (req: express.Request, res: express.Response) => {

        // console.log('requested games : err = [' + err + ']');
        // console.log('requested games : db = [' + db + ']');

        db.collection('games').find({}).toArray((err1: mongodb.MongoError, games: any[]) => {
            res.json({ games });
        });

        // res.send('Hello World!');
    });

    app.post('/api/games/', (req: express.Request, res: express.Response) => {
        // console.log(req.body);
        // // res.status(404).json({
        // //     errors: {
        // //         global: 'Still working on this feature.'
        // //     }
        // // });

        // res.json('Hello World!');

        const { errors, isValid } = validate(req.body);

        if (isValid) {
            const { title, cover } = req.body;

            db.collection('games').insert({ title, cover }, (insertErr, insertResult) => {
                if (insertErr) {
                    res.status(500).json({ errors: { global: 'MongoDb error' } });
                } else {
                    res.json({ game: insertResult.ops[0] });
                }
            });
        } else {
            res.status(400).json({ errors });
        }
    });

    app.use((req: express.Request, res: express.Response) => {
        res.status(404).json({
            errors: {
                global: 'Still working on this feature.'
            }
        });
    });

    app.listen(8080, () => console.log('server is running on localhost:8080'));
});
