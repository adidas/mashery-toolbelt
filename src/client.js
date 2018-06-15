/*
  Instance of MasheryClient with saving and restoring credentials in
  HOMEDIR/.mashery-toolbelt/credentials.json
*/

const MasheryClient = require('adidas-mashery-client')
const { readFileSync, writeFileSync } = require('./utils/storage')

const CREDENTIALS_FILE = 'credentials.json'

let credentials

try {
  const credentialsFile = readFileSync(CREDENTIALS_FILE)
  credentials = JSON.parse(credentialsFile)
} catch (err) {
  if (err.code !== 'ENOENT') {
    throw err
  }
}

module.exports = new MasheryClient({
  credentials,
  onAuthenticationSuccess: credentials => {
    writeFileSync(CREDENTIALS_FILE, JSON.stringify(credentials, null, 2))
  },
  onAuthenticationError: error => {
    console.error(`${error.name}: ${error.message}`)
    console.log('Try running `mashery-toolbelt auth` again')
    process.exit(1)
  }
})
