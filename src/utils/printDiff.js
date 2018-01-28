const jsondiffpatch = require('jsondiffpatch')

const differ = jsondiffpatch.create({
  objectHash: function(obj, index) {
    // try to find an id property, otherwise just use the index in the array
    return obj.id || obj.name || '$$index:' + index
  },
  textDiff: {
    // default 60, minimum string length (left and right sides) to use text diff algorythm: google-diff-match-patch
    minLength: 200
  },
  propertyFilter: function(name, context) {
    return !['created', 'updated'].includes(name)
  },
  cloneDiffValues: true,
  arrays: {
    // default true, detect items moved inside the array (otherwise they will be registered as remove+add)
    detectMove: true,
    // default false, the value of items moved is not included in deltas
    includeValueOnMove: false
  }
})

function printDiff(before, after) {
  const delta = differ.diff(api, newApi)
  jsondiffpatch.console.log(delta)
}

module.exports = printDiff
