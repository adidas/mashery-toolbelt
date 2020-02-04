const inquirer = require('inquirer')
const client = require('../client')
const spinner = require('../utils/spinner')

const required = label => value =>
  value === '' ? `${label} can't be empty` : true
const HIDDEN_PASSWORD = '******'

const questions = [
  {
    name: 'username',
    type: 'input',
    message: 'Username:',
    allow_empty: false,
    validate: required('Username'),
    default: client.credentials.username
  },
  {
    name: 'password',
    type: 'password',
    message: 'Password:',
    allow_empty: false,
    validate: required('Password'),
    default: client.credentials.password ? HIDDEN_PASSWORD : null
  },
  {
    name: 'key',
    type: 'input',
    message: 'Application key (Client ID):',
    allow_empty: false,
    validate: required('Key'),
    default: client.credentials.key
  },
  {
    name: 'secret',
    type: 'input',
    message: 'Application secret (Client secret):',
    allow_empty: false,
    validate: required('Secret'),
    default: client.credentials.secret
  },
  {
    name: 'scope',
    type: 'input',
    message: 'Area UUID:',
    allow_empty: false,
    validate: required('Area UUID'),
    default: client.credentials.scope
  }
]

function runAuthenticate (answers) {
  spinner.start()
  const authRequest = client.authenticate(answers)
  authRequest.then(spinner.stop, spinner.stop)
  return authRequest
}

function auth () {
  if (
    process.env.MASHERY_USERNAME != undefined &&
    process.env.MASHERY_PASSWORD != undefined &&
    process.env.MASHERY_KEY != undefined &&
    process.env.MASHERY_SECRET != undefined &&
    process.env.MASHERY_SCOPE != undefined
  ) {
    var answers = {
      username: process.env.MASHERY_USERNAME,
      password: process.env.MASHERY_PASSWORD,
      key: process.env.MASHERY_KEY,
      secret: process.env.MASHERY_SECRET,
      scope: process.env.MASHERY_SCOPE
    }
    return runAuthenticate(answers)
  }

  return inquirer
    .prompt(questions)
    .then(answers => {
      if (answers.password === HIDDEN_PASSWORD && client.credentials.password) {
        answers.password = client.credentials.password
      }

      return runAuthenticate(answers)
    })
    .then(() => console.log('Authentication done. Credentials stored'))
    .catch(error => console.error('Authentication failed: ', error))
}

module.exports = auth
