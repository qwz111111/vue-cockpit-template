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
          return date.getFullYear().toString().substr(2)
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
