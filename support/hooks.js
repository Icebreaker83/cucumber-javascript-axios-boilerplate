/* eslint-disable no-undef */
const { BeforeAll, Before, AfterAll, After } = require('cucumber')
const Logger = require('logplease')
const TestData = require('./util/test_data')
global.tempEmail = require('./util/temp-email')

global.logger = Logger.create(
  'cmatest',
  { filename: 'cmatest.log', appendFile: true }
)
Logger.setLogLevel(Logger.LogLevels.INFO)

BeforeAll(function () {
  global.logger.info('Initialize test run...')
  global.tempEmail.createBrowserSession()
})

Before(async function (scenario) {
  if (!global.testData) {
    logger.info(`parameters: ${JSON.stringify(this.parameters)}`)
    TestData.load(this.parameters.environment)
    global.testData = TestData.data
  } else {
    global.logger.debug('test data already initialized!')
  }

  logger.info(`******************************************************`)
  logger.info(`Start test: ${scenario.pickle.name}`)
})

AfterAll(async function () {
  await global.tempEmail.quitDriver()
})

After(async function (scenario) {
  switch (scenario.result.status) {
    case 'passed':
      logger.info(`${scenario.result.status}: '${scenario.pickle.name}'!`)
      break
    case 'failed':
      logger.error(`${scenario.result.status}: '${scenario.pickle.name}'!`)
  }
  logger.info(`******************************************************`)
})
/* eslint-enable no-undef */
