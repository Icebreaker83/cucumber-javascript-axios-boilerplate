/* eslint-disable camelcase */
const path = require('path')
const yaml = require('js-yaml')
const fs = require('fs')
const _ = require('lodash')

const config_path = path.join(
  path.dirname(
    path.dirname(__dirname)),
  'config')

// Loads the config and test data from the following files:
//   cd_<environment>.yml
//   td_<environment>.yml
//
// Parameters:
// environment - stage, prod (default: stage)
//
class TestData {
  static load (environment) {
    TestData.environment = environment || 'stage'

    let config_data
    let test_data

    try {
      const cd_file = path.join(config_path, `cd_${TestData.environment}.yml`)
      config_data = yaml.safeLoad(fs.readFileSync(cd_file, 'utf8'))
    } catch (e) {
      console.log(`Unable to load config data for ${TestData.environment}!`)
      throw e
    }

    try {
      const td_file = path.join(config_path, `td_${TestData.environment}.yml`)
      test_data = yaml.safeLoad(fs.readFileSync(td_file, 'utf8'))
    } catch (e) {
      console.log(`Unable to load ${TestData.environment} test data!`)
      throw e
    }

    try {
      TestData.data = _.merge(config_data, test_data)
    } catch (e) {
      console.log('Unable to load test data!')
      console.log(e)
    }
  }
}

module.exports = TestData
/* eslint-enable camelcase */
