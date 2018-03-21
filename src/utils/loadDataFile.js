const path = require('path')
const fs = require('fs')
const YAML = require('yamljs')

function loadDataFile (filePath) {
  const format = path.extname(filePath).slice(1)

  if (!['json', 'yaml', 'yml'].includes(format)) {
    throw new Error(`data file '${filePath}' must be yaml or json`)
  }

  let data
  if (format === 'json') {
    const content = fs.readFileSync(filePath, 'utf8')
    data = JSON.parse(content)
  } else {
    data = YAML.load(filePath)
  }

  return data
}

module.exports = loadDataFile
