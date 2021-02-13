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

let find = async () => {
  const top25 = [];
  const results = await Repo.find((err, repos) => {
    if (err) console.log(err);
    return repos;
  })
  .then(allRepos => {
    const sorted = allRepos.sort((a, b) => {
      return b._doc.forks - a._doc.forks;
    })
    return sorted;
  })
  .then(sortedRepos => {
    for (let i = 0; i < 25; i++) {

      // Getting top 25 repo names only
      // top25.push(sortedRepos[i]._doc.repo);

      // Getting top 25 repos with url
      const tempObj = {};
      tempObj.repo = sortedRepos[i]._doc.repo;
      tempObj.url = sortedRepos[i]._doc.url;
      top25.push(tempObj);
    }
  })
  .catch(error => {
    if (error) console.log(error);
  })
  return top25;
}

module.exports.save = save;
module.exports.find = find;

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