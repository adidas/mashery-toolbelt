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
      .catch(error => console.error('error: ', error))
  })

// Authenticate automatically on first request
const client2 = new MasheryClient({ credentials })
client2.fetchAllServices()
  .then(data => console.log('done: ', data))
  .catch(error => console.error('error: ', error))
