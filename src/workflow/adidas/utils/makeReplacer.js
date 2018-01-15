const PATTERN_MATCH = /(\*)/

function validatePatterns(value, name, required) {
  if (Array.isArray(value)) {
    value = value.filter(val => typeof(val) === 'string' && val.length)
  } else {
    value = typeof(value) === 'string' && value.length ? [value] : []
  }

  if (required === true && value.length === 0) {
    const nameText = name ? `'${name}' ` : ''
    throw new Error(`Replacer ${nameText}can't be empty`)
  }

  return value
}

function ident(value) {
  return value
}

function patternsToReplacers(patterns) {
  return patterns.map(pattern => {
    const [from, to] = pattern.split(':')
    const isPattern = from.includes('*')

    const fromParts = from.split(PATTERN_MATCH)
    const toParts = to && to.split(PATTERN_MATCH)

    if (isPattern && toParts && fromParts.length !== toParts.length) {
      throw new Error(
        `pattern '${pattern}': source and target pattern has different count of components`
      )
    }

    if (!to) {
      if (patterns.length > 1) {
        throw new Error(
          `There can be only single replace value pattern. Instead ${
            patterns.length
          } patterns presented`
        )
      }

      return {
        type: 'simple',
        replaceWith: from
      }
    }

    if (!isPattern) {
      return {
        type: 'multi',
        match: from,
        replaceWith: to
      }
    }

    return {
      type: 'pattern',
      match: new RegExp(
        `^${fromParts.map(part => (part === '*' ? '(.*?)' : part)).join('')}$`
      ),
      replaceWith: match => {
        let matchIndex = 0

        return toParts
          .map(part => (part === '*' ? match[++matchIndex] : part))
          .join('')
      }
    }
  })
}

function makeReplacer(patterns, { name, required = true } = {}) {
  patterns = validatePatterns(patterns, name, required)

  if (patterns.length === 0) {
    return ident
  }

  const replacers = patternsToReplacers(patterns)

  return function(value) {
    let newValue

    replacers.find(({ type, match, replaceWith }) => {
      if (type === 'simple') {
        newValue = replaceWith
        return true
      }

      if (type === 'multi') {
        if (value === match) {
          newValue = replaceWith
          return true
        }
      }

      if (type === 'pattern') {
        const matchResult = value.match(match)

        if (matchResult) {
          newValue = replaceWith(matchResult)
          return true
        }
      }
    })

    if (newValue) {
      return newValue
    }

    if (!required) {
      return value
    }

    throw new Error(
      `Can't match value '${value}' with patterns\n${patterns.join('\n')}`
    )
  }
}

module.exports = makeReplacer
