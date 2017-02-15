import express = require('express');
import mongodb = require('mongodb');

const app = express();
const dbUrl: string = 'mongodb://127.0.0.1:27017/crudewithredux';

mongodb.MongoClient.connect(dbUrl, (err: mongodb.MongoError, db: mongodb.Db) => {

    app.get('/api/games/', (req: any, res: any) => {

        // console.log('requested games : err = [' + err + ']');
        // console.log('requested games : db = [' + db + ']');

        db.collection('games').find({}).toArray((err1: any, games: any) => {
            res.json({ games });
        });

        // res.send('Hello World!');
    });

    app.listen(8080, () => console.log('server is running on localhost:8080'));
});
