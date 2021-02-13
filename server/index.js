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
      save.userData;
      res.status(201).send(`Got ${username}'s repos and added to the database!`);
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



// app.post('/repos', function (req, res) {
//   // TODO - your code here!
//   // This route should take the github username provided
//   // and get the repo information from the github API, then
//   // save the repo information in the database

//   let username = req.body.login;
//   getReposByUsername.getReposByUsername(username)
//     .then(userData => {
//       // let repos = [];
//       // for (let i = 0; i < userData.data.length; i++) {
//       //   let data = userData.data[i];
//       //   let entry = new save.Repo({
//       //     username: data.owner.login,
//       //     id: data.id,
//       //     repo: data.name,
//       //     url: data.html_url,
//       //     created: data.created_at,
//       //     forks: data.forks
//       //   })
//       //   repos.push(entry);
//       // }
//       // return repos;
//       save.save(userData);
//     })
//     .catch(error => {
//       if (error) console.log(error);
//     });
//     // .then(repoData => {
//     //   save.save(repoData);
//     // })
//   res.send('working on it');
// });