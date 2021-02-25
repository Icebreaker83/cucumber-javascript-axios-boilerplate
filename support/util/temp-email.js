'use strict'

const chromedriver = require('chromedriver')
const WebDriver = require('selenium-webdriver')
const util = require('util')
let client

const waitFind = (locator) => {
  return client.findElement(() => {
    return client.wait(WebDriver.until.elementLocated(locator), 5 * 60 * 1000)
      .then(() => {
        return client.findElement(locator)
      }, (ex) => {
        console.error(ex)
      })
  })
/* return client.findElement(async () => {
  await client.wait(WebDriver.until.elementLocated(locator), 5 * 60 * 1000)
  return client.findElement(locator)
}) */
}

module.exports = {

  createBrowserSession: function () {
    client = new WebDriver.Builder().withCapabilities({
      browserName: 'chrome',
      // javascriptEnabled: true,
      // acceptSslCerts: true,
      chromeOptions: {
        // args: ['--headless', '--disable-gpu']
        args: ['start-maximized']
      },
      path: chromedriver.path
    }).build()
  },

  /**
  * The Backend will provide a new email address on every load.
  * It is imperative to keep track of the email address during the test.
  * @returns {Promise}
  * @param {string} url - url of temp email
  * @example
  *      const tempEmail = await tempemail.getTempEmail('https://tempemail.com')
  */
  getEmailAddress: async function (url) {
    client.get(url)
    const mail = await waitFind(WebDriver.By.id('mail'))
    return mail.getAttribute('value')
  },

  /***
  * In case of code verification
  * @returns {Promise}
  * @param {string} emailSubject - Subject of sent verification email
  * @param {Object} options - Object that contains optional arguments for link/code verification
  * @param {string=} options.linkText - (optional) text in verification link
  * @param {string=} options.codeCssSelector - (optional) css selector for element which contains verification code
  * @example
  *   tempemail.registrationVerification('Registration', {linkText:'Confirm Account', codeCssSelector: '#code'})
  *   tempemail.registrationVerification('Registration', {linkText:'Confirm Account', log:global.logger})
  *   tempemail.registrationVerification('Registration', {codeCssSelector: '#code'})
  ***/
  registrationVerification: async function (emailSubject, linkText) {
    try {
      console.log('Waiting for registration email for 5min...')
      /* open registration email */
      await waitFind(WebDriver.By.linkText(emailSubject)).click()
      console.log('Registration email found!')
      const path = "//a[contains(text(),'" + linkText + "')]"
      const link = await waitFind(WebDriver.By.xpath(path))
      // const link = await waitFind(WebDriver.By.linkText(linkText))
      let linkAttribute = await link.getAttribute('href')

      // return activation token from link href and delete email
      await waitFind(WebDriver.By.className('click-to-delete-mail')).click()
      return linkAttribute.split('activationToken=')[1]
    } catch (err) {
      console.log('----------error--------------')
      console.log(util.inspect(err, false, null))
      console.log('-----------------------------')
    }
  },

  resetPassword: async function (emailSubject, linkText) {
    try {
      console.log('Waiting for reset password email for 5min...')
      /* open reset password email */
      await waitFind(WebDriver.By.linkText(emailSubject)).click()
      console.log(emailSubject + ' email found!')
      // click on reset password link
      // const link = await waitFind(WebDriver.By.linkText(linkText))
      const path = "//a[contains(text(),'" + linkText + "')]"
      const link = await waitFind(WebDriver.By.xpath(path))
      // return reset password token from link href and delete email
      const linkAttribute = await link.getAttribute('href')
      await waitFind(WebDriver.By.className('click-to-delete-mail')).click()
      return linkAttribute.split('reset-password?token=')[1]
    } catch (err) {
      console.log('----------error--------------')
      console.log(util.inspect(err, false, null))
      console.log('-----------------------------')
    }
  },

  quitDriver: function () {
    console.log('WebDriver is about to close.')
    return client.quit()
  }
}