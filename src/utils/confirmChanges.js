const inquirer = require('inquirer')
const printDiff = require('./printDiff')
const spinner = require('./spinner')

function confirmChanges({ before, after, message, action }) {
  spinner.stop()

  printDiff(before, after)

  return inquirer.prompt([
    {
      name: 'confirm',
      type: 'confirm',
      message,
    }
  ])
  .then(({ confirm }) => {
    if(confirm === true) {
      return action(after)
    }

    console.log('Cancelled')
    process.exit(0)
  })
}

module.exports = confirmChanges
