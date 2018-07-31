const inquirer = require('inquirer')
const printDiff = require('./printDiff')
const spinner = require('./spinner')

function confirmChanges ({ before, after, message, action }) {
  spinner.stop()

  const diffResult = printDiff(before, after)

  diffResult.printDiff()

  return inquirer
    .prompt([
      {
        name: 'confirm',
        type: 'confirm',
        message
      }
    ])
    .then(({ confirm }) => {
      if (confirm === true) {
        return action(after)
      }

      console.log('Cancelled')
      process.exit(0)
    })
}

const CHOICES = [
  {
    key: 'y',
    name: 'Continue with given changes',
    value: 'yes'
  },
  {
    key: 'n',
    name: 'Cancel request',
    value: 'no'
  },
  {
    key: 'm',
    name: 'Show detailed diff',
    value: 'more'
  }
]

function confirmChangesWithOverview ({
  before,
  after,
  message,
  property,
  action
}) {
  spinner.stop()

  const diffResult = printDiff(before, after)

  diffResult.printOverview(property)

  const question = [
    {
      name: 'confirm',
      type: 'expand',
      choices: CHOICES,
      message: `Confirm? [y]es | [n]o | show [m]ore`
      // message: `${message} [h]elp`
    }
  ]

  function ask () {
    return inquirer.prompt(question).then(({ confirm }) => {
      if (confirm === 'more') {
        diffResult.printDiff()

        return ask()
      }

      return confirm === 'yes'
    })
  }

  return ask().then(confirm => {
    if (confirm === true) {
      return action(after)
    }

    console.log('Cancelled')
    process.exit(0)
  })
}

module.exports = confirmChanges
module.exports.withOverview = confirmChangesWithOverview
