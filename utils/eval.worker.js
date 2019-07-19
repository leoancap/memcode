"use strict"

try {
  onmessage = function onmessage(m) {
    try {
      // let console = null
      var result = eval(m.data)
      postMessage(result)
      close()
    } catch (e) {
      postMessage({
        error: e.name,
        message: e.message,
      })
      close()
    }
  }
} catch (error) {
  postMessage(error)
}
