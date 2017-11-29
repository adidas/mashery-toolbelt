/*
  Instance of MasheryClient with saving and restoring credentials in
  HOMEDIR/.mashery-toolbelt/credentials.json
*/

const MasheryClient = require('./lib/client')
const { readFileSync, writeFileSync } = require('./utils/storage')

const CREDENTIALS_FILE = 'credentials.json'

let credentials

try {
  const credentialsFile = readFileSync(CREDENTIALS_FILE)
  credentials = JSON.parse(credentialsFile)
} catch(err) {
  if(err.code !== 'ENOENT') {
    throw err
  }
}

module.exports = new MasheryClient({
  credentials,
  onAuthSuccess: (credentials) => {
    writeFileSync(CREDENTIALS_FILE, JSON.stringify(credentials, null , 2))
  },
  onAuthError: (error) => {
    console.error(`Auth error: ${error.name}, ${error.message}`)
    console.log('Try running `heroku-toolbelt auth` again')
    process.exit(1)
  }
})
