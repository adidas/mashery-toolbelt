function parsePath (path) {
  if (typeof path === 'string') {
    return path
      .split('.')
      .map(part => (part.match(/\d+/) ? parseInt(part) : part))
  }

  return path
}

function get (source, path, defaultValue) {
  path = parsePath(path)
  const value = path.reduce((object, property) => {
    if (typeof object === 'object') {
      return object[property]
    }
  }, source)

  return value === undefined ? defaultValue : value
}

function set (source, path, value) {
  path = parsePath(path)
  const len = path.length
  return path.reduce((object, property, i) => {
    if (typeof object !== 'object') {
      const errorPath = path.slice(0, i)
      const pathMessage = errorPath.length
        ? ` on path ${errorPath.join('.')}`
        : null
      throw new Error(
        `Element '${object}' is not an object (or array)${pathMessage}`
      )
    }

    if (i === len - 1) {
      object[property] = value
    } else if (object[property] === undefined) {
      const shouldBeArray = typeof path[i + 1] === 'number'
      object[property] = shouldBeArray ? [] : {}
    }

    return object[property]
  }, source)
}

module.exports = {
  get,
  set
}
