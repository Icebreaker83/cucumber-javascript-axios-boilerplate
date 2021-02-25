const { Given, When, Then } = require('cucumber')
const util = require('../../support/util/util')
const userApi = require('../../support/api_requests/user')
let passwordResetTokenArray = []

Given('that his password has already been changed to new one', async function () {
  if (this.user.getPasswordArray().length === 1) {
    const oldPass = this.user.password
    const newPass = oldPass + '1'
    this.response = await userApi.updatePassword(oldPass, newPass, this.accessToken)
    await util.checkStatus(this.response.status, 200, 'Update password response: ')
    this.user.password = newPass
    this.user.pushToPasswordArray(newPass)
  }
})

When('I send the request to reset the password', async function () {
  this.response = await userApi.resetPasswordRequest(this.user.email)
  await util.checkStatus(this.response.status, 200, 'Reset password request response: ')
})

When('I click on {string} link in received email with subject {string}', async function (linkText, emailSubject) {
  // Duplicate emails are creating a problem with test where we need to run several reset passwords.
  // We use the array to compare the current token with previous.
  // If they are the same then tempEmail.resetPassword() function needs to be executed again.
  // Because the reset password email is deleted after token is obtained,
  // by comparing tokens and executing resetPassword function again we are deleting duplicate email and getting the correct token.
  do {
    this.passwordResetToken = await global.tempEmail.resetPassword(emailSubject, linkText)
  } while (passwordResetTokenArray.includes(this.passwordResetToken))

  passwordResetTokenArray.push(this.passwordResetToken)
})

When('I enter new password', async function () {
  const newPass = this.user.password + '1'
  this.response = await userApi.resetPassword(newPass, this.passwordResetToken)
  await util.checkStatus(this.response.status, 200, 'Reset password response: ')
  this.user.password = newPass
  this.user.pushToPasswordArray(newPass)
})

When('I enter old password', async function () {
  const prevPass = this.user.getPasswordArray()[this.user.getPasswordArray().length - 2]
  this.response = await userApi.resetPassword(prevPass, this.passwordResetToken)
  // If this test fails, and the password is changed to the old one,
  // we need to set the old password as currently valid password, so the next test is not impacted.
  // Without this change the next test would depend on this test, because we use the same Temp user for both in order to reduce tests time
  if (this.response.status === 200) {
    this.user.password = prevPass
    this.user.pushToPasswordArray(prevPass)
  }
})

When('I update my current password with the new one', async function () {
  const oldPass = this.user.password
  const newPass = oldPass + '1'
  this.response = await userApi.updatePassword(oldPass, newPass, this.accessToken)
  await util.checkStatus(this.response.status, 200, 'Update password response: ')
  this.user.password = newPass
  this.user.pushToPasswordArray(newPass)
})

Then('I should be able to login using new password', async function () {
  this.response = await userApi.logInUser(this.user.email, this.user.password)
  await util.checkStatus(this.response.status, 200, 'Log in user response: ')
})

Then('I shouldn\'t be able to reset the password', async function () {
  await util.checkStatus(this.response.status, 403, 'Reset password response: ')
})

Then('I should receive only one email with subject {string} which contains link {string}', async function (emailSubject, linkText) {
  switch (emailSubject) {
    case 'Reset password code':
      await util.hasDuplicates(emailSubject, linkText, global.tempEmail.resetPassword)
      break
    case 'Registration':
      await util.hasDuplicates(emailSubject, linkText, global.tempEmail.registrationVerification)
      break
    default:
      console.log('No handling of duplicate emails with subject ' + emailSubject)
  }
})
