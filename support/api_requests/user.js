const axios = require('axios')
const querystring = require('querystring')
const fs = require('fs')
const FormData = require('form-data')

exports.registerUser = async function (email, username, password) {
  try {
    const response = await axios.post(
      `${global.testData.url}/urs/users`,
      {
        'email': email,
        'password': password,
        'username': username
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return response
  } catch (err) {
    // console.log('-----error-------------------------------')
    // console.log(err)
    // console.log('------------------------------------')
    return err.response
  }
}

exports.verifyRegistration = async function (activationToken) {
  try {
    const response = await axios.get(
      `${global.testData.url}/urs/user_confirmation?activationToken=` + activationToken
    )
    return response
  } catch (err) {
    // console.log('-----error-------------------------------')
    // console.log(err)
    return err.response
    // console.log('------------------------------------')
  }
}

exports.logInUser = async function (username, pass) {
  const dataString = querystring.stringify({
    'grant_type': 'password',
    'username': username,
    'password': pass
  })
  // const dataString='grant_type=password&password=' + pass + '&username=' + email

  try {
    const response = await axios({
      method: 'post',
      url: `${global.testData.url}/urs/oauth/token`,
      data: dataString,
      auth: {
        username: global.testData.clients.regular.username,
        password: global.testData.clients.regular.password
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return response
  } catch (err) {
    // console.log('-----error-------------------------------')
    // console.log(err)
    // console.log('------------------------------------')
    return err.response
  }
}

exports.refreshAccessToken = async function (refreshToken) {
  const dataString = querystring.stringify({
    'grant_type': 'refresh_token',
    'refresh_token': refreshToken
  })

  try {
    const response = await axios({
      method: 'post',
      url: `${global.testData.url}/urs/oauth/token`,
      data: dataString,
      auth: {
        username: global.testData.clients.regular.username,
        password: global.testData.clients.regular.password
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return response
  } catch (err) {
    // console.log('-----error-------------------------------')
    // console.log(err)
    // console.log('------------------------------------')
    return err.response
  }
}

exports.resetPasswordRequest = async function (email) {
  try {
    const response = await axios({
      method: 'post',
      url: `${global.testData.url}/urs/password_reset_request`,
      data: { 'email': email },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch (err) {
    // console.log('-----error-------------------------------')
    // console.log(err)
    // console.log('------------------------------------')
    return err.response
  }
}

exports.resetPassword = async function (newPassword, resetPasswordToken) {
  try {
    const response = await axios({
      method: 'post',
      url: `${global.testData.url}/urs/password_reset`,
      data: {
        'new_password': newPassword,
        'password_reset_token': resetPasswordToken
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch (err) {
    // console.log('-----error-------------------------------')
    // console.log(err)
    // console.log('------------------------------------')
    return err.response
  }
}

exports.updatePassword = async function (currentPassword, newPassword, accessToken) {
  try {
    const response = await axios({
      method: 'put',
      url: `${global.testData.url}/urs/users/update_password`,
      data: {
        'current_password': currentPassword,
        'new_password': newPassword
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    })
    return response
  } catch (err) {
    // console.log('-----error-------------------------------')
    // console.log(err)
    // console.log('------------------------------------')
    return err.response
  }
}

exports.editUserProfile = async function (userData, accessToken) {
  try {
    const response = await axios({
      method: 'put',
      url: `${global.testData.url}/urs/users/self`,
      data: userData,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    })
    return response
  } catch (err) {
    // console.log('-----error-------------------------------')
    // console.log(err)
    // console.log('------------------------------------')
    return err.response
  }
}

exports.getUserProfile = async function (accessToken) {
  try {
    const response = await axios({
      method: 'get',
      url: `${global.testData.url}/urs/users/self`,
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    return response
  } catch (err) {
    // console.log('-----error-------------------------------')
    // console.log(err)
    // console.log('------------------------------------')
    return err.response
  }
}

exports.deleteUserProfile = async function (accessToken) {
  try {
    const response = await axios({
      method: 'delete',
      url: `${global.testData.url}/urs/users/self`,
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    return response
  } catch (err) {
    // console.log('-----error-------------------------------')
    // console.log(err)
    // console.log('------------------------------------')
    return err.response
  }
}

exports.uploadProfileImage = async function (accessToken, imageType) {
  const formData = new FormData()
  // formData.append('image', `./support/images/${imageType}.jpg`)
  formData.append('image', fs.createReadStream(`./support/images/${imageType}.jpg`))
  // console.log(formData)

  try {
    const response = await axios({
      method: 'patch',
      url: `${global.testData.url}/urs/users/image/${imageType}`,
      data: formData,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': 'Bearer ' + accessToken
      }
    })
    return response
  } catch (err) {
    console.log('-----error-------------------------------')
    console.log(err)
    console.log('------------------------------------')
    return err.response
  }
}
