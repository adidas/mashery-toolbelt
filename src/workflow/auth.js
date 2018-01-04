const inquirer = require('inquirer')
const client   = require('../client')
const spinner = require('../utils/spinner');

const required = label => value => value === '' ? `${label} can't be empty` : true
const HIDDEN_PASSWORD = '******'

const questions = [
  {
    name: 'username',
    type: 'input',
    message: "Username:",
    allow_empty: false,
    validate: required('Username'),
    default: client.credentials.username,
  },
  {
    name: 'password',
    type: 'password',
    message: "Password:",
    allow_empty: false,
    validate: required('Password'),
    default: client.credentials.password ? HIDDEN_PASSWORD : null,
  },
  {
    name: 'key',
    type: 'input',
    message: "Application key (Client ID):",
    allow_empty: false,
    validate: required('Key'),
    default: client.credentials.key,
  },
  {
    name: 'secret',
    type: 'input',
    message: "Application secret (Client secret):",
    allow_empty: false,
    validate: required('Secret'),
    default: client.credentials.secret,
  },
  {
    name: 'scope',
    type: 'input',
    message: "Area UUID:",
    allow_empty: false,
    validate: required('Area UUID'),
    default: client.credentials.scope,
  },
]

function auth() {
  return (
    inquirer.prompt(questions)
      .then(answers => {
        if(answers.password === HIDDEN_PASSWORD && client.credentials.password) {
          answers.password = client.credentials.password
        }

        spinner.start()
        const authRequest = client.authenticate(answers)
        authRequest.then(spinner.stop, spinner.stop)

        return authRequest
      })
      .then(() => console.log('Authentication done. Credentials stored'))
      .catch(error => console.error('Authentication failed: ', error))
  )
}

module.exports = auth
