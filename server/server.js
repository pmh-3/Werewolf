const { query } = require('express');
const express = require('express'); 
const {readFileSync, writeFileSync} = require('fs');
const app = express(); 
const port = process.env.PORT || 5000; 
const util = require('util');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const serverFX = () => {
    app.get('/getPlays', (req, res) => {
        console.log("getting plays");
        const count = readFileSync('./dummyDB.txt', 'utf-8');
        console.log('getting count: ', String(count));

        res.send({
            plays: String(count)
        })

    });

    app.get('/addPlay', (req, res) => {

        const count = readFileSync('./dummyDB.txt', 'utf-8');
        const newCount = parseInt(count) + 1

        writeFileSync('./count.txt', String(newCount));
        console.log('new count: ', newCount);

    });
    app.post('/addLeader', (req, res) => {
        var Name = req.body.name;

        res.send(
        `I received your POST request. This is what you sent me: ${req.body.name}`,
        );
    });
}

serverFX();


