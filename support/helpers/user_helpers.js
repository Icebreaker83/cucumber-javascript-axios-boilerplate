const util = require('../util/util')
const userApi = require('../api_requests/user')

const logIn = async function (username, password) {
  let response = await userApi.logInUser(username, password)
  await util.checkStatus(response.status, 200, username + ' log in response: ')
  return response.data.access_token
}

module.exports = {
  logIn
}
