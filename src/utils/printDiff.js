const jsondiffpatch = require('jsondiffpatch')
const chalk = require('chalk')

const differ = jsondiffpatch.create({
  objectHash: function (obj, index) {
    // try to find an id property, otherwise just use the index in the array
    return obj.$$diffId || obj.__id || obj.id || obj.name || '$$index:' + index
  },
  textDiff: {
    // default 60, minimum string length (left and right sides) to use text diff algorythm: google-diff-match-patch
    minLength: 200
  },
  propertyFilter: function (name, context) {
    return !['$$diffId', 'created', 'updated'].includes(name)
  },
  cloneDiffValues: true,
  arrays: {
    // default true, detect items moved inside the array (otherwise they will be registered as remove+add)
    detectMove: true,
    // default false, the value of items moved is not included in deltas
    includeValueOnMove: false
  }
})

function getDeepWithDiff (object, property) {
  const path = property.split('.')

  return path.reduce((object, property, i) => {
    const isLast = path.length === i + 1

    if (typeof object === 'object') {
      let nextProperty = object[property]

      if (isLast) {
        // If previous value was different than array we have diff
        // [previous value, new array value]
        if (Array.isArray(nextProperty) && Array.isArray(nextProperty[1])) {
          return nextProperty[1]
        }

        return nextProperty
      } else {
        if (Array.isArray(nextProperty)) {
          return nextProperty[1] || nextProperty[0]
        }

        return nextProperty
      }
    }
  }, object)
}

function getDiffSummary (delta, property) {
  const diff = getDeepWithDiff(delta, property)

  const changes = {
    created: 0,
    updated: 0,
    deleted: 0
  }

  // If we just created array with values
  if (Array.isArray(diff)) {
    changes.created = diff.length
  } else {
    Object.entries(diff).forEach(([key, delta]) => {
      if (key !== '_t') {
        if (key.startsWith('_')) {
          if (Array.isArray(delta) && delta.length === 3 && delta[2] === 0) {
            changes.deleted++
          }
        } else {
          if (Array.isArray(delta)) {
            if (delta.length === 1) {
              changes.created++
            }
          } else {
            changes.updated++
          }
        }
      }
    })
  }

  return changes
}

function printDiff (before, after) {
  const delta = differ.diff(before, after)

  if (delta !== undefined) {
    return {
      printOverview (property) {
        const changes = getDiffSummary(delta, property)
        const split = property.split('.')
        const propertyName = split[split.length - 1]

        console.log(`Summary of ${propertyName}:`)

        let createdMessage = `Created: ${changes.created}`
        if (changes.created) {
          createdMessage = chalk.green(createdMessage)
        }
        console.log(createdMessage)

        let updatedMessage = `Updated: ${changes.updated}`
        if (changes.updated) {
          updatedMessage = chalk.yellow(updatedMessage)
        }
        console.log(updatedMessage)

        let deletedMessage = `Deleted: ${changes.deleted}`
        if (changes.deleted) {
          deletedMessage = chalk.red(deletedMessage)
        }
        console.log(deletedMessage)

        console.log()
      },
      printDiff () {
        jsondiffpatch.console.log(delta)
      }
    }
  }
}

module.exports = printDiff
