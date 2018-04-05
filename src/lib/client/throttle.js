function throttle (client, originalCall) {
  if (process.env['DISABLE_THROTTLE']) {
    return originalCall()
  }

  // Initialize pool for parallels calls
  if (!client.__pool) {
    client.__pool = [...Array(client.options.threads)].map((_, i) => ({
      id: i
    }))
    client.__pendingCalls = []
  }

  let callResolve
  let callReject

  const promise = new Promise((resolve, reject) => {
    callResolve = resolve
    callReject = reject
  })

  const call = () => {
    return originalCall()
      .then(result => callResolve(result))
      .catch(error => callReject(error))
  }

  client.__pendingCalls.push(call)

  run(client)

  return promise
}

function processPendingCalls (client, runner) {
  const pendingCall = client.__pendingCalls.shift()

  if (pendingCall) {
    pendingCall().then(() => processPendingCalls(client, runner))
  } else {
    runner.running = false
  }
}

function run (client) {
  client.__pool.forEach(runner => {
    if (!runner.running) {
      runner.running = true
      processPendingCalls(client, runner)
    }
  })
}

module.exports = throttle
