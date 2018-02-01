const { set, get } = require('../../src/utils/deep')

test('get', () => {
  const value = get({a: [{b: 1}]}, ['a', 0, 'b'])
  expect(value).toEqual(1)
})

test('get with string path', () => {
  const value = get({a: [{b: 1}]}, 'a.0.b')
  expect(value).toEqual(1)
})


test('get with missing element', () => {
  const value = get({a: {b: 1}}, ['a', 0, 'b'])
  expect(value).toEqual(undefined)
})

test('get with default value', () => {
  const value = get({a: {b: 1}}, ['a', 0, 'b'], 'xxx')
  expect(value).toEqual('xxx')
})

test('set existing value', () => {
  const obj = {a: [{b: 1}]}
  const value = set(obj, ['a', 0, 'b'], 2)
  expect(obj.a[0].b).toEqual(2)
})

test('set missing value', () => {
  const obj = {}
  const value = set(obj, ['a', 0, 'b'], 2)
  expect(obj).toEqual({a: [{b: 2}]})
})

test('set on non object element', () => {
  const obj = 1
  expect(() => set(obj, ['a'], 2)).toThrow();
})

test('set on non object element #2', () => {
  const obj = {a: 'a'}
  expect(() => set(obj, ['a', 'b'], 2)).toThrow();
})