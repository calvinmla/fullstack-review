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
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  try {
    // let response = await axios(options);
    // console.log(response.data)
    // return response;
    return await axios(options);
  } catch (error) {
    console.log(error);
  }
}

// let x = getReposByUsername('octocat')

// console.log('helper ->', x)

module.exports.getReposByUsername = getReposByUsername;