/* eslint-disable camelcase */
module.exports = class User {
  constructor (userData) {
    this._email = userData.email
    this._username = userData.email
    this._password = userData.password
    this._about_user = userData.about_user
    this._countryCode = userData.countryCode
    this._firstname = userData.firstname
    this._lastname = userData.lastname
    this._facebook_username = userData.facebook_username
    this._instagram_username = userData.instagram_username
    this._twitter_username = userData.twitter_username
    this._passwordArray = [userData.password]
  }

  set email (email) {
    this._email = email
  }

  get email () {
    return this._email
  }

  set username (username) {
    this._username = username
  }

  get username () {
    return this._username
  }

  set password (password) {
    this._password = password
  }

  get password () {
    return this._password
  }

  pushToPasswordArray (newPass) {
    this._passwordArray.push(newPass)
  }

  getPasswordArray () {
    return this._passwordArray
  }

  set about_user (about_user) {
    this._about_user = about_user
  }

  get about_user () {
    return this._about_user
  }

  set countryCode (countryCode) {
    this._countryCode = countryCode
  }

  get countryCode () {
    return this._countryCode
  }

  set firstname (firstname) {
    this._firstname = firstname
  }

  get firstname () {
    return this._firstname
  }

  set lastname (lastname) {
    this._lastname = lastname
  }

  get lastname () {
    return this._lastname
  }

  set facebook_username (facebook_username) {
    this._facebook_username = facebook_username
  }

  get facebook_username () {
    return this._facebook_username
  }

  set instagram_username (instagram_username) {
    this._instagram_username = instagram_username
  }

  get instagram_username () {
    return this._instagram_username
  }

  set twitter_username (twitter_username) {
    this._twitter_username = twitter_username
  }

  get twitter_username () {
    return this._twitter_username
  }
  /*
  createNewPassword () {
    const currPass = getPasswordByIndex(1)
    const passBaseArr = currPass.split('!')
    const newPass = passBaseArr[0] + '!' + (parseInt(passBaseArr[1]) + 1)
    this._passwordArray.push(newPass)
    this._password = newPass
  } */
}
/* eslint-enable camelcase */
