const makeReplacer = require('../../../../src/workflow/adidas/utils/makeReplacer')

test('makeReplacer without value throws error', () => {
  expect(() => makeReplacer()).toThrow(Error, "Replacer can't be empty")
})

test('makeReplacer without value, but optional required', () => {
  const replacer = makeReplacer(null, { required: false })
  expect(replacer('value')).toBe('value')
})

test('makeReplacer with simple value', () => {
  const replacer = makeReplacer('new value')
  expect(replacer('value')).toBe('new value')
})

test('makeReplacer with multiple replaces', () => {
  const replacer = makeReplacer([
    'value:new value',
    'another value:other value'
  ])
  expect(replacer('value')).toBe('new value')
  expect(replacer('another value')).toBe('other value')
})

test('makeReplacer with not matching replacer throws error', () => {
  const replacer = makeReplacer('value:new value')

  const expectedError = `Can't match value 'missing value' with patterns
value:new value`

  expect(() => replacer('missing value')).toThrow(expectedError)
})

test('makeReplacer with pattern replacing', () => {
  const replacer = makeReplacer('*.old*:*.new*')

  expect(replacer('some.old.value')).toBe('some.new.value')
})

test('makeReplacer with multiple pattern replacing', () => {
  const replacer = makeReplacer(['domain.*:*', '*.old*:*.new*'])

  expect(replacer('domain.cz')).toBe('cz')
  expect(replacer('some.old.value')).toBe('some.new.value')
})

test('makeReplacer with not matching patterns throws error', () => {
  expect(() => makeReplacer('*.old*:*.new')).toThrow(
    `pattern '*.old*:*.new': source and target pattern has different count of components`
  )
})

test('makeReplacer with replace path', () => {
  const replacer = makeReplacer('*/dev/*:*/qa/*')

  expect(replacer('path/dev/{id}')).toBe('path/qa/{id}')
})

test('real use case #1', () => {
  const replacer = makeReplacer('(Demo)*:DEV (testplay)*')
  expect(replacer('(Demo) Approval API')).toBe('DEV (testplay) Approval API')
})

