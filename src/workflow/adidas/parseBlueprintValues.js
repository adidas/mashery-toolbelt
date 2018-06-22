const SPLIT_PATH_PATTERN = /(?<!\\)\./

module.exports = function parseBlueprintValues (pairs) {
  if (pairs) {
    return pairs.reduce((result, pair) => {
      const match = pair.match(
        /^\s*(?<path>[a-zA-Z0-9-_\s\.\\(){}[\]]+?)\s*=\s*(?<value>.*?)\s*$/
      )

      if (!match) {
        throw new Error(`Cannot parse --set argument with value "${pair}"`)
      }

      const pathParts = match.groups.path.split(SPLIT_PATH_PATTERN)

      pathParts.reduce((nestedResult, part, índex) => {
        if (nestedResult[part]) {
          throw new Error(`--set argument with value "${pair}" is duplicated`)
        }
        nestedResult[part] =
          pathParts.length - 1 === índex ? match.groups.value : {}
        return nestedResult[part]
      }, result)

      return result
    }, {})
  }

  return {}
}
