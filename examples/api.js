const MasheryClient = require('../src/lib/client')

const credentials = {
  username: `YOUR USERNAME`,
  password: `YOUR PASSWORD`,
  key: `APP KEY`,
  secret: `APP SECRET`,
  scope: `AREA UUID`,
}

// Authenticate on demenad
const client = new MasheryClient()
client.authenticate(credentials)
  .then(() => {
    client.fetchAllServices()
      .then(data => console.log('done: ', data))
      .catch(error => console.error('request error: ', error.message))
  })
  .catch(error => console.error('auth error: ', error.message))

// Authenticate automatically on first request
const client2 = new MasheryClient({
  credentials,
  onAuthenticationError: error => console.error('auth error: ', error.message)
})

client2.fetchAllServices()
  .then(data => console.log('done: ', data))
  .catch(error => console.error('error: ', error))
