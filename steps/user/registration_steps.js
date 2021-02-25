const { Given, When, Then } = require('cucumber')
const util = require('../../support/util/util')
const userApi = require('../../support/api_requests/user')
const User = require('../../support/util/user')
// const testData = require('../support/util/test_data')

Given('I have an unregistered email', async function () {
  if (global.user) {
    await global.tempEmail.quitDriver()
    global.tempEmail.createBrowserSession()
  }
  const email = await global.tempEmail.getEmailAddress('https://temp-mail.org/')
  global.user = new User(util.getUserData(email))
  this.user = global.user
})

Given('I have a registered user', async function () {
  this.user = global.testData.users.qa_user_5
})

Given('I have a user that is registered', async function () {
  if (!global.user) {
    const email = await global.tempEmail.getEmailAddress('https://temp-mail.org/')
    global.user = new User(util.getUserData(email))
    this.response = await userApi.registerUser(global.user.email, global.user.email, global.user.password)
    await util.checkStatus(this.response.status, 200, 'Register user response: ')
    const activationToken = await global.tempEmail.registrationVerification('Registration', 'Confirm Email Address')
    this.response = await userApi.verifyRegistration(activationToken)
    await util.checkStatus(this.response.status, 200, 'Registration verification response: ')
  }
  this.user = global.user
})

When('I register new user using the given email', async function () {
  this.response = await userApi.registerUser(this.user.email, this.user.username, this.user.password)
  await util.checkStatus(this.response.status, 200, 'Register user response: ')
})

When('I verify the registration via email', async function () {
  const activationToken = await global.tempEmail.registrationVerification('Registration', 'Confirm Email Address')
  await userApi.verifyRegistration(activationToken)
  this.response = await userApi.logInUser(this.user.email, this.user.password)
})

When('I attempt to register again', async function () {
  this.response = await userApi.registerUser(this.user.email, this.user.username, this.user.password)
})

When('I register 100 users', async function () {
  const randomName = require('random-name')
  const arrayOfUsers = []
  for (let i = 57; i < 101; i++) {
    if (global.user) {
      await global.tempEmail.quitDriver()
      global.tempEmail.createBrowserSession()
    }
    const email = await global.tempEmail.getEmailAddress('https://temp-mail.org/')
    global.user = new User(util.getUserData(email))
    this.user = global.user
    this.user.username = 'esp_' + i
    this.user.password = 'espTest!1'
    this.user.firstname = randomName.first()
    this.user.lastname = randomName.last()

    this.response = await userApi.registerUser(this.user.email, this.user.username, this.user.password)
    console.log(this.user.email + ' ' + this.user.username + ' ' + this.user.password)
    await util.checkStatus(this.response.status, 200, 'Register user response: ')

    const activationToken = await global.tempEmail.registrationVerification('Registration', 'Confirm Email Address')
    await userApi.verifyRegistration(activationToken)
    this.response = await userApi.logInUser(this.user.email, this.user.password)
    await util.checkStatus(this.response.status, 200, 'Log in response: ')
    this.accessToken = this.response.data.access_token

    arrayOfUsers.push(this.user.email + ',' + this.user.password + ',' + this.user.username + ',' + this.user.firstname + ',' + this.user.lastname)

    this.userData = {
      'about_user': 'ESports test user',
      // "country_code": this.user.countryCode,
      'facebook_username': 'esports_facebook',
      'first_name': this.user.firstname,
      'instagram_username': 'esports_instagram',
      'last_name': this.user.lastname,
      'twitter_username': 'esports_twitter'
    }
    this.response = await userApi.editUserProfile(this.userData, this.accessToken)
    await util.checkStatus(this.response.status, 200, 'Edit user profile response: ')
  }

  let csvContent = arrayOfUsers.join('\n')
  console.log(csvContent)
  let link = window.document.createElement('a')
  link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent))
  link.setAttribute('download', 'upload_data.csv')
  link.click()
})

Then('I should get the response that registration has failed because user is already registered', async function () {
  await util.checkStatus(this.response.status, 422, 'Register user response: ')
})
