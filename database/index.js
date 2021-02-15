const mongoose = require('mongoose');
// Added promise
mongoose.Promise = global.Promise;
// Added config variable for mongodb/mongoose
let configVarMongo = process.env.mongo;
if (configVarMongo === null || configVarMongo === '' || configVarMongo === undefined) {
  configVarMongo = 'mongodb://localhost/fetcher';
}
mongoose.connect(configVarMongo, {
  // Added condition
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
      if (err.code === 11000) console.log('This repo already exists')
      else if (err) console.log(err);
      else console.log(`Saved ${result.repo} repo`);
    })
  }
}

// Created find function to query database
let find = async () => {
  let top25 = [];
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
      /* -----Getting top 25 repos with url----- */
      const tempObj = {};
      tempObj.repo = sortedRepos[i]._doc.repo;
      tempObj.url = sortedRepos[i]._doc.url;
      top25.push(tempObj);

      /* -----Getting top 25 repo names only----- */
      // top25.push(sortedRepos[i]._doc.repo);
    }
  })
  .catch(error => {
    if (error) console.log(error);
  })
  return top25;
}

module.exports.save = save;
module.exports.find = find;