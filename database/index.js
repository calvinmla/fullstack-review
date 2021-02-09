const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// added 'new' in front of 'mongoose.Schema'
let repoSchema = new mongoose.Schema({
  login: String,
  repo_id: {type: Number, unique: true},
  name: String,
  html_url: String,
  created_at: Date,
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

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;