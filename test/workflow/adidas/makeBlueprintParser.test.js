const makeBlueprintParser = require('../../../src/workflow/adidas/makeBlueprintParser')
const { number, string, shape } = require('prop-types')

const testPropTypes = {
  name: string.isRequired,
  nested: shape({
    name: string.isRequired,
    count: number
  })
}

const blueprintParser = makeBlueprintParser(testPropTypes)

test('null', () => {
  expect(blueprintParser(null)).resolves.toEqual(null)
})

test('valid', () => {
  const blueprint = { name: 'Some name', nested: { name: 'Nested name' } }
  expect(blueprintParser(blueprint)).resolves.toEqual(blueprint)
})

test('error', () => {
  const blueprint = {
    nested: {
      count: '10'
    }
  }

  return expect(blueprintParser(blueprint)).rejects.toEqual(
    new Error(
      [
        'Blueprint contains errors:',
        'The prop `name` is marked as required in `blueprint`, but its value is `undefined`.',
        'The prop `nested.name` is marked as required in `blueprint`, but its value is `undefined`.'
      ].join('\n')
    )
  )
})
