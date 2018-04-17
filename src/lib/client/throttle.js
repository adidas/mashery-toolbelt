/**
 * Pool data are stored locally
 */
const POOLS = new Map()
let WORKER_COUNTER = 0

/**
 * Representation of pool with workers and pending calls
 *
 * @class Pool
 */
class Pool {
  constructor () {
    this.calls = []
    this.workers = []
  }

  updateWorkers (threads) {
    const currentWorkers = this.workers.length
    if (threads > currentWorkers) {
      for (let i = currentWorkers + 1; i <= threads; i++) {
        this.workers.push(new Worker(++WORKER_COUNTER))
      }
    } else if (threads < currentWorkers) {
      this.workers.splice(threads).forEach(worker => (worker.running = false))
    }
  }
}

/**
 * Representation of worker
 *
 * @class Worker
 */
class Worker {
  constructor (id) {
    this.id = id
    this.running = false
  }
}

/**
 * Throttle parallel calls to API
 *
 * @param {any} key - identifier of pool
 * @param {function(): any} originalCall
 * @param {number} [threads=2]
 * @returns {Promise<any, Error>}
 */
function throttle (key, call, threads = 2) {
  if (threads <= 0 || process.env['DISABLE_THROTTLE']) {
    try {
      return Promise.resolve(call())
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const pool = initializePool(key, threads)
  return throttleCall(pool, call)
}

/**
 * Throttle parallel calls to API based on client.options.threads size
 *
 * @param {any} key - identifier of pool
 * @param {number} threads
 * @returns {Object} pool
 * @property {Array<function(): Promise<any, Error>>} pool.calls
 * @property {Array<{id: number, running: boolean}>} pool.workers
 */
function initializePool (key, threads) {
  // Initialize pool
  let pool = POOLS.get(key)

  if (!pool) {
    pool = new Pool()
    POOLS.set(key, pool)
  }

  pool.updateWorkers(threads)

  return pool
}

/**
 * Throttle parallel calls to API based on client.options.threads size
 *
 * @param {Pool} pool
 * @param {function(): Promise<any, Error>} originalCall
 * @returns {Promise<Response, Error>}
 */
function throttleCall (pool, call) {
  return new Promise((resolve, reject) => {
    const pendingCall = () => {
      // Assume that original call can be async call, or function with plain result
      try {
        return Promise.resolve(call()).then(resolve, reject)
      } catch (e) {
        reject(e)
      }
    }

    pool.calls.push(pendingCall)
    runPool(pool)
  })
}

/**
 * Starts pool
 *
 * @param {Pool} client
 */
function runPool (pool) {
  pool.workers.forEach(worker => {
    if (!worker.running) {
      worker.running = true
      processCallInWorker(pool, worker)
    }
  })
}

/**
 * Get call from pool and run it within worker
 *
 * @param {Pool} pool
 * @param {Worker} worker
 */
function processCallInWorker (pool, worker) {
  if (!worker.running) return

  const call = pool.calls.shift()

  if (call) {
    call().then(() => processCallInWorker(pool, worker))
  } else {
    worker.running = false
  }
}

module.exports = throttle
