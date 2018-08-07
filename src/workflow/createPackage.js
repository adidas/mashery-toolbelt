const chalk = require('chalk')
const client = require('../client')
const spinner = require('../utils/spinner')
const makeBlueprintParser = require('./adidas/makeBlueprintParser')
const packagePropTypes = require('./adidas/utils/packageBlueprintPropTypes')
const makePackageFromBlueprint = require('./adidas/resolvePackageBlueprint')
const confirmChanges = require('../utils/confirmChanges')

const loadBlueprint = makeBlueprintParser(packagePropTypes)

function loadPackageBlueprint (blueprintPath) {
  console.log(
    `Creating or updating package from blueprint file '${blueprintPath}'`
  )
  spinner.start()

  loadBlueprint(blueprintPath)
    .then(makePackageFromBlueprint)
    .then(packageData => {
      spinner.stop()

      if (packageData.package.id) {
        updatePackage(packageData)
      } else {
        createPackage(packageData)
      }
    })
}

function updatePackage (packageData) {
  return confirmChanges
    .withOverview({
      before: packageData.persisted,
      after: packageData.package,
      property: 'package.plans',
      message: `${chalk.yellow(
        'Updating existing package.'
      )} Are chages above valid?`,
      action: updatedData => {
        spinner.start()
        return client.updatePackage(packageData.package.id, updatedData)
      }
    })
    .then(updatedPackage => {
      spinner.stop()
      console.log(
        `Package updated. https://adidas.admin.mashery.com/control-center/api-packages/${
          updatedPackage.id
        }`
      )
    })
    .catch(error => {
      console.error('Updating failed:')
      console.error(error)
    })
}

function createPackage (packageData) {
  return confirmChanges
    .withOverview({
      before: {},
      after: packageData.package,
      property: 'package.plans',
      message: `${chalk.green('Creating new package.')} Is schema above valid?`,
      action: newData => {
        spinner.start()
        return client.createPackage(newData)
      }
    })
    .then(newPackage => {
      spinner.stop()
      console.log(
        `Package created. https://adidas.admin.mashery.com/control-center/api-packages/${
          newPackage.id
        }`
      )
    })
    .catch(error => {
      console.error('Creating failed:')
      console.error(error)
    })
}

module.exports = loadPackageBlueprint
