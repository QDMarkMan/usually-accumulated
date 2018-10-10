import * as _ from 'lodash-es'

const fun1 = function (value) {
  return _.isArray(value)
}

const fun2 = function (value) {
  return value
}

export {
  fun1,
  fun2
}