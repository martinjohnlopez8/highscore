const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3005
const Player = require('./model/Player')

var cors = require('cors');

// Then use it before your routes are set up:
app.use(cors());

var mongoDB = 'mongodb+srv://admin:admin@cluster0-wkcxn.mongodb.net/Winner?retryWrites=true&w=majority';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

db.once('open', () => console.log('connected to database'))

app.use(express.json())

app.get('/', async (req, res) => {
    Player.find({ name: {$ne: 'Draw'}}).sort('-win').exec((err, players) => {
        res.json(players)
    })
})

app.post('/', (req, res) => {
    Player.findOne({name: req.body.name}, async(err, player) => {
        if (player) {
            if (player.win) {
                player.win = player.win + 1
                player.save()
            } else {
                player.win = 1
                player.save()
            }
        } else {
            const player = new Player({
                name: req.body.name,
            })

            try {
                const newPlayer = await player.save()
                res.status(201).json(newPlayer)
              } catch (err) {
                res.status(400).json({ message: err.message })
              }
        }
    })

  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))