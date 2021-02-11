const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// added 'new' in front of 'mongoose.Schema'
let repoSchema = new mongoose.Schema({
  username: String,
  id: {type: Number, unique: true},
  repo: String,
  url: String,
  created: Date,
  forks: Number
});

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

let Repo = mongoose.model('Repo', repoSchema);

let save = (...repos) => {
  for (let repo of repos) {
    repo.save((err, result) => {
      if (err) throw err;
      console.log(`Saved ${repo}!)`)
    })
  }
}

module.exports.save = save;