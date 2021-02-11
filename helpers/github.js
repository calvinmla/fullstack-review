const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = async (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

  let options = {
    method: 'GET',
    data: username,
    url: 'https://api.github.com',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  let response = await axios(options);
  return response;
}

module.exports.getReposByUsername = getReposByUsername;