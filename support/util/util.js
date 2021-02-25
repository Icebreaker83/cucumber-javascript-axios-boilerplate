const assert = require('assert')

const sleep = function (milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const getUserData = function (email) {
  const userData = {
    'email': email,
    'username': email,
    'password': global.testData.default_password,
    'about_user': 'QA',
    'countryCode': 'RS',
    'firstname': 'John',
    'lastname': 'Smith',
    'facebook_username': 'facebook_qa',
    'instagram_username': 'instagram_qa',
    'twitter_username': 'twitter_qa'
  }

  return userData
}

// resetPassword or registrationVerification from temp-email are passed as argument refreshCallback
// purpose of the function is to detect if 2 emails have been sent for one reset password or registration request
// resetPassword and registrationVerification fuctions wait for email to be received
// when email is received then email is opened and reset password token or confirm account token are returned and email is deleted.
// passed functions are called twice and token's are stored in tempArray
// then token's are asserted with notEqual
// if they are equal `Duplicate emails detected!` message is displayed in log and test fails
const hasDuplicates = async function (emailSubject, linkText, refreshCallback) {
  let tempArray = []
  for (let i = 0; i < 2; i++) {
    tempArray.push(await refreshCallback(emailSubject, linkText))
  }

  const currPassToken = tempArray[tempArray.length - 1]
  const prevPassToken = tempArray[tempArray.length - 2]

  assert.notEqual(currPassToken, prevPassToken, `Duplicate emails detected!`)
}

const checkStatus = async function (currentStatus, desiredStatus, logText) {
  global.logger.info(logText + currentStatus)
  assert.equal(currentStatus, desiredStatus, `Incorrect status code - ${currentStatus}`)
}

/* eslint-disable no-cond-assign */
const getDistinctItemFromJSONlist = function (jsonList, itemName) {
  let lookup = {}
  let result = []

  for (var item, i = 0; item = jsonList[i++];) {
    var name = item[itemName]

    if (!(name in lookup)) {
      lookup[name] = 1
      result.push(name)
    }
  }
  return result
}
/* eslint-enable no-cond-assign */

const getArrayDifference = function (arr1, arr2) {
  let result = []
  arr1.forEach((e1) => {
    if (!(arr2.includes(e1))) {
      result.push(e1)
    }
  })
  return result
}

module.exports = {
  sleep,
  getUserData,
  hasDuplicates,
  checkStatus,
  getDistinctItemFromJSONlist,
  getArrayDifference
}
