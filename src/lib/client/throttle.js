function throttle(client, call) {
  if(process.env['DISABLE_THROTTLE']) {
    console.log("Call")
    return call()
  }

  if(!client.__throttledCall) {
    client.__throttledCall = Promise.resolve()
  }

  const throttledCall = () => {
    console.log("Throttled call")
    return call()
  }

  client.__throttledCall = client.__throttledCall.then(throttledCall, throttledCall)

  return client.__throttledCall
}

module.exports = throttle
