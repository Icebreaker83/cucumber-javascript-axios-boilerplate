const { When, Then } = require('cucumber')
const util = require('../../support/util/util')
const userApi = require('../../support/api_requests/user')
const assert = require('assert')

When('I edit my user data', async function () {
  this.userData = {
    'about_user': this.user.about_user,
    'country_code': this.user.countryCode,
    'facebook_username': this.user.facebook_username,
    'first_name': this.user.firstname,
    'instagram_username': this.user.instagram_username,
    'last_name': this.user.lastname,
    'twitter_username': this.user.twitter_username
  }
  this.response = await userApi.editUserProfile(this.userData, this.accessToken)
  await util.checkStatus(this.response.status, 200, 'Edit user profile response: ')
})

When('I delete my profile and I try to log in again', async function () {
  this.response = await userApi.deleteUserProfile(this.accessToken)
  await util.checkStatus(this.response.status, 200, 'Delete user profile response: ')
  this.response = await userApi.logInUser(this.user.email, this.user.password)
  global.user = null
  await global.tempEmail.quitDriver()
  global.tempEmail.createBrowserSession()
})

Then('I should be able to see the changes on my user profile', async function () {
  this.response = await userApi.getUserProfile(this.accessToken)
  await util.checkStatus(this.response.status, 200, 'Get user profile response: ')
  const newUserData = {
    'about_user': this.response.data.about_user,
    'country_code': this.response.data.country.code,
    'facebook_username': this.response.data.facebook_username.split('/')[1],
    'first_name': this.response.data.first_name,
    'instagram_username': this.response.data.instagram_username.split('/')[1],
    'last_name': this.response.data.last_name,
    'twitter_username': this.response.data.twitter_username.split('/')[1]
  }
  assert.equal(JSON.stringify(this.userData), JSON.stringify(newUserData), `Edited user profile data not visible`)

  // set values to default
  const defaultUserData = {
    'about_user': 'default',
    'country_code': 'RS',
    'facebook_username': 'default',
    'first_name': 'default',
    'instagram_username': 'default',
    'last_name': 'default',
    'twitter_username': 'default'
  }
  this.response = await userApi.editUserProfile(defaultUserData, this.accessToken)
  await util.checkStatus(this.response.status, 200, 'Edit user profile to default response: ')
})

When('I upload avatar image for my profile', async function () {
  this.response = await userApi.uploadProfileImage(this.accessToken, 'avatar')
  await util.checkStatus(this.response.status, 200, 'Upload avatar image response: ')
  this.avatar_image = this.response.data.image_url
})

Then('I should be able to see the avatar image on my profile', async function () {
  this.response = await userApi.getUserProfile(this.accessToken)
  assert.equal(this.response.data.avatar_image, this.avatar_image, 'Profile avatar image url not matching! ')
})
