Object.defineProperty(Object.prototype, 'pick', {
  value (...paths) {
    return paths.reduce((object, path) => ({ [path]: this[path], ...object }), {})
  }
})

Object.defineProperty(Object.prototype, 'pickBy', {
  value (predicate) {
    return Object.entries(this)
      .filter(([k, v]) => predicate(k, v))
      .reduce((obj, [k, v]) => ({ [k]: v, ...obj }), {})
  }
})
