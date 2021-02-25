const { setWorldConstructor, setDefaultTimeout } = require('cucumber')

function CustomWorld ({ attach, parameters }) {
  this.attach = attach
  this.parameters = parameters

  /* const options = {
    desiredCapabilities: {
      browserName: parameters.browser
    }
  }
  this.browser = webdriver.remote(options) */
}

setWorldConstructor(CustomWorld)
setDefaultTimeout(30 * 60 * 1000)
