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
  // Dont save password
  onAuthSuccess: ({ password, ...credentials}) => {
    // console.log("Auth success from onAuthSuccess")
    writeFileSync(CREDENTIALS_FILE, JSON.stringify(credentials, null , 2))
  },
  onAuthError: (error) => {
    // console.log("Auth error from onAuthError", error)
    // TODO: auth error, write some message about calling `mashery-toolbelt auth` again?
  }
})
