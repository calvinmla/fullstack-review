const express = require('express');
const bodyParser = require('body-parser')
const {getReposByUsername} = require('../helpers/github');
const {save, find} = require('../database/index');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

// POST request to /repos
app.post('/repos', (req, res) => {
  let username = req.body.login;
  getReposByUsername(username)
    .then(userData => {
      save(userData);
      res.status(201).send(`Got ${username}'s repos!`);
    })
    .catch(error => {
      if (error) throw error;
    });
});

// GET request to /repos
app.get('/repos', (req, res) => {
  let results = find()
    .then(repos => {
      res.status(200).send(repos);
    })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});