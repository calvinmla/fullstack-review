const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = async (username) => {

  let options = {
    method: 'GET',
    data: username,
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  try {
    return await axios(options);
  } catch (error) {
    console.log(error);
  };
}

module.exports.getReposByUsername = getReposByUsername;