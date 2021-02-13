const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true
});

// added 'new' in front of 'mongoose.Schema'
let repoSchema = new mongoose.Schema({
  username: String,
  id: {type: Number, unique: true},
  repo: String,
  url: String,
  created: Date,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  for (let i = 0; i < repos.data.length; i++) {
    let data = repos.data[i];
    let entry = new Repo({
      username: data.owner.login,
      id: data.id,
      repo: data.name,
      url: data.html_url,
      created: data.created_at,
      forks: data.forks
    })
    entry.save((err, result) => {
      if (err) console.log(err);
      console.log(`Saved ${result}!`)
    })
  }
}

// Repo.find((err, repos) => {
//   if (err) console.log(err);
//   console.log(repos);
// })

module.exports.save = save;


/* Initial Schema */
// let repoSchema = new mongoose.Schema({
//   login: String,
//   repos: [
//     {
//       id: {type: Number, unique: true},
//       name: String,
//       html_url: String,
//       created_at: Date,
//       stargazers_count: Number
//     }
//   ]
// });