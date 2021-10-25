const { query } = require('express');
const express = require('express'); 
const {readFileSync, writeFileSync} = require('fs');
const app = express(); 
const port = process.env.PORT || 6000; 
const util = require('util');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const serverFX = () => {
    app.get('/getPlays', (req, res) => {

        const count = readFileSync('./dummyDB.txt', 'utf-8');
        const newCount = parseInt(count) + 1;

        writeFileSync('./dummyDB.txt', String(newCount));
        console.log('new count: ', newCount);

        res.send({
            plays: String(newCount)
        })

    });

    app.post('/addLeader', (req, res) => {
        var Name = req.body.name;
        res.send(
        `I received your POST request. This is what you sent me: ${req.body.name}`,
        );
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`)); 
serverFX();


