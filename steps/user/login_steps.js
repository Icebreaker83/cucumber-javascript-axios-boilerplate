/* eslint-disable camelcase */
const { Given, When, Then } = require('cucumber')
const util = require('../../support/util/util')
const user_helpers = require('../../support/helpers/user_helpers')
const user_api = require('../../support/api_requests/user')

// this step is used for users that are generated through temp email registration
Given('I have logged in', async function () {
  this.accessToken = await user_helpers.logIn(this.user.username, this.user.password)
})
// this step is used to login as already registered admin user
Given('I have logged in as Admin', async function () {
  this.user = global.testData.users.admin_user
  this.accessToken = await user_helpers.logIn(this.user.username, this.user.password)
})
// this step is used to login as already registered regular user
Given('I have a user that is logged in', async function () {
  this.user = global.testData.users.regular_user_1
  this.accessToken = await user_helpers.logIn(this.user.username, this.user.password)
})

When('I try to log in', async function () {
  this.response = await user_api.logInUser(this.user.email, this.user.password)
})

When('I try to log in with old password', async function () {
  this.response = await user_api.logInUser(this.user.email, this.user.getPasswordArray()[this.user.getPasswordArray().length - 2])
})

When('I try to log in with wrong password', async function () {
  this.response = await user_api.logInUser(this.user.email, 'WrongPassword!123')
})

Then('I should be able to login', async function () {
  await util.checkStatus(this.response.status, 200, 'Log in user response: ')
})

Then('I shouldn\'t be able to log in', async function () {
  await util.checkStatus(this.response.status, 400, 'Log in user response: ')
})

Then('Refresh token should be valid for 24h', async function () {
  let refreshTokenEvery1min = setInterval(async () => {
    this.response = await user_api.refreshAccessToken(this.refresh_token)
    await util.checkStatus(this.response.status, 200, 'Refresh token response: ')
  }, 60 * 1000)
  await util.sleep(24 * 60 * 60 * 1000)
  clearInterval(refreshTokenEvery1min)
  global.logger.info(this.accessTokenDuplication)
})
/* eslint-enable camelcase */
