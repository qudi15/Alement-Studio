const isObject = function (value) {
  return (value && value.toString && value.toString() === '[object Object]') || Array.isArray(value)
}
const alGetterCoolPath = function (source, path) {
  if (path == null) { return source }
  path = path + ''
  const pathArr = path.split('.')
  const length = pathArr.length
  let value = source
  for (let i = 0; i < length; i++) {
    if (value && isObject(value)) {
      value = value[pathArr[i]]
    } else {
      value = undefined
      break
    }
  }
  return value
}
const alSetterCoolPath = function (model, path, value, vueInstance) {
  path = path + ''
  const pathArr = path.split('.')
  const length = pathArr.length
  let obj = model
  for (let i = 0; i < length; i++) {
    if (i === length - 1) {
      if (vueInstance) {
        vueInstance.$set(obj, pathArr[i], value)
      } else {
        obj[pathArr[i]] = value
      }
    } else {
      if (!isObject(obj[pathArr[i]])) {
        if (vueInstance) {
          vueInstance.$set(obj, pathArr[i], {})
        } else {
          obj[pathArr[i]] = {}
        }
      }
      obj = obj[pathArr[i]]
    }
  }
}
export {
  isObject, alGetterCoolPath, alSetterCoolPath
}
