module.exports = function debounce (worker, context = null) {
  debounced.running = null
  return debounced

  async function debounced () {
    if (debounced.running !== null) {
      try {
        await debounced.running
      } catch (_) {
        // ignore - do not fail on old errors
      }
    }

    // another "thread" beat us to it, just piggy pack on that one
    if (debounced.running !== null) return debounced.running

    debounced.running = worker.call(context)

    try {
      return await debounced.running
    } finally {
      debounced.running = null
    }
  }
}
