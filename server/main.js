let mongoose = require('mongoose');
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let Players = require('./model/player.js'); 
let db = 'mongodb://127.0.0.1/player';

const app = express();

const HTTP_PORT = 3030;

mongoose.connect(db, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/restore/:name", (req, res) => {
  Players.findOne({ name: req.params.name }, 
    (err, doc) => {
      if(err) {
        res.send("Could not restore game!");
      } else {
        res.send(doc);
      }  
    });
});

app.post("/save", (req, res) => {
  Players.findOneAndUpdate({
    name: req.body.name
  }, { 
    $set: {
      name: req.body.name,
      wins: req.body.wins,
      loses: req.body.loses
    }
  }, {
    upsert: true
  }, (err, doc) => {
    if(err) {
      res.send("Error updating player!");
    } else {
      res.send(doc);
    }
  });
});

app.listen(HTTP_PORT, () =>
  console.log(`Listening on port ${HTTP_PORT}!`),
);

