const express = require('express');
const bodyParser = require('body-parser')
const getReposByUsername = require('../helpers/github.js');
const save = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  let username = req.body.login;
  getReposByUsername.getReposByUsername(username)
    .then(userData => {
      save.save(userData);
    })
    // .catch(error => {
    //   if (error) throw error;
    // });
  res.send('working on it');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
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