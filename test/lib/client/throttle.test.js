const throttle = require('../../../src/lib/client/throttle')

test('throttle', () => {
  const pool = 'pool 1'
  const promise = throttle(pool, () => 'result', 2)
  return expect(promise).resolves.toEqual('result')
})

test('disable throttle', () => {
  const pool = 'pool 2'
  const promise = throttle(pool, () => 'result', 0)
  return expect(promise).resolves.toEqual('result')
})

test('throttle multiple calls', () => {
  const pool = 'pool 3'
  const promises = []
  const expectedResult = []

  for (let i = 0; i < 10; i++) {
    expectedResult.push(i)

    const promise = throttle(
      pool,
      () => {
        return new Promise(resolve => {
          setTimeout(() => resolve(i), 5)
        })
      },
      2
    )

    promises.push(promise)
  }

  return expect(Promise.all(promises)).resolves.toEqual(expectedResult)
})

test('throttle multiple calls with many workers', () => {
  const pool = 'pool 3'
  const promises = []
  const expectedResult = []

  for (let i = 0; i < 100; i++) {
    expectedResult.push(i)

    const promise = throttle(
      pool,
      () => {
        return new Promise(resolve => {
          setTimeout(() => resolve(i), 5)
        })
      },
      20
    )

    promises.push(promise)
  }

  return expect(Promise.all(promises)).resolves.toEqual(expectedResult)
})

test('throttle with error', () => {
  const pool = 'pool 4'
  const promise = throttle(
    pool,
    () => {
      throw new Error('throttle error')
    },
    2
  )
  return expect(promise).rejects.toEqual(new Error('throttle error'))
})
