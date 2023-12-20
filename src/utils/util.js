/**
 * 防抖
 * @param {Function} fn 函数
 * @param {Number} delay
 * @return {Function}
 */
export const debounce = (fn, delay = 300) => {
  let timer
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

/**
 * 节流
 * @param {Function} fn 函数
 * @param {Number} delay
 * @return {Function}
 */
export const throttle = (fn, delay = 1000) => {
  let timer
  return function () {
    if (timer != null) return
    fn.apply(this, arguments)
    timer = setTimeout(() => {
      timer = null
    }, delay)
  }
}

/**
 * 单例模式
 * @param {Function} fn 函数
 * @param {Number} delay
 * @return {Function}
 */
export const single = fn => {
  let result
  return function () {
    if (!result) {
      result = new fn(arguments)
    }
    return result
  }
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return {number}
 * @example randomNum(0,100)
 */
export const randomNum = (min, max)=> {
  if (min >= max) {
    throw new Error('min should be less than max')
  }
  return Math.floor(Math.random() * (min - max) + max)
}

/**
 * 标准时间格式转化
 * @param {String} date  时间戳
 * @param {String} formatStr  时间格式，例：'yyyy年M月d日'返回'2019年9月9日'、'yyyy-MM-dd HH:mm:ss'返回'2019-09-09 14:36:49'
 * @return {String}
 */
export const transDate = (date, formatStr) => {
  date = date || new Date()
  formatStr = formatStr || 'yyyy-MM-dd HH:mm'

  let zeroize = (value, length) => {
    if (!length) {
      length = 2
    }
    value += ''
    let zeros = ''
    for (let i = 0; i < length - value.length; i++) {
      zeros += '0'
    }
    return zeros + value
  }

  return formatStr.replace(
    /"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g,
    $0 => {
      switch ($0) {
        case 'd':
          return date.getDate()
        case 'dd':
          return zeroize(date.getDate())
        case 'ddd':
          return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][
            date.getDay()
          ]
        case 'dddd':
          return [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ][date.getDay()]
        case 'M':
          return date.getMonth() + 1
        case 'MM':
          return zeroize(date.getMonth() + 1)
        case 'MMM':
          return [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ][date.getMonth()]
        case 'MMMM':
          return [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ][date.getMonth()]
        case 'yy':
          return date.getFullYear().toString().substring(2)
        case 'yyyy':
          return date.getFullYear()
        case 'h':
          return date.getHours() % 12 || 12
        case 'hh':
          return zeroize(date.getHours() % 12 || 12)
        case 'H':
          return date.getHours()
        case 'HH':
          return zeroize(date.getHours())
        case 'm':
          return date.getMinutes()
        case 'mm':
          return zeroize(date.getMinutes())
        case 's':
          return date.getSeconds()
        case 'ss':
          return zeroize(date.getSeconds())
        case 'l':
          return date.getMilliseconds()
        case 'll':
          return zeroize(date.getMilliseconds())
        case 'tt':
          return date.getHours() < 12 ? 'am' : 'pm'
        case 'TT':
          return date.getHours() < 12 ? 'AM' : 'PM'
        default:
          return ''
      }
    }
  )
}


/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return {string|null}
 * @example localGet('key')
 */
export const localGet = (key)=> {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (error) {
    return value
  }
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return {void}
 * @example localSet('key','value')
 */
export const localSet = (key, value)=> {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return {void}
 * @example localRemove('key')
 */
export const localRemove = (key) => {
  window.localStorage.removeItem(key)
}

/**
 * @description 清除所有localStorage
 * @return {void}
 * @example localClear()
 */
export const localClear = () => {
  window.localStorage.clear()
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return {String}
 * @example isType([])
 */
export const isType = (val) => {
  if (val === null) {
    return 'null'
  }
  if (typeof val !== 'object') {
    return typeof val
  } else {
    return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
  }
}

/**
 * @description 对象数组深克隆
 * @param {Object} obj 源对象
 * @return {Object}
 * @example deepCopy({})
 */
export const deepCopy = (obj)=> {
  let newObj
  newObj = Array.isArray(obj) ? [] : {}
  for (const attr in obj) {
    if (typeof obj[attr] === 'object') {
      newObj[attr] = deepCopy(obj[attr])
    } else {
      newObj[attr] = obj[attr]
    }
  }
  return newObj
}
