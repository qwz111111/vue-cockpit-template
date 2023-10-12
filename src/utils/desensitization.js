// 身份证号脱敏
export function idCard(id) {
  return id.replace(/(\d{6})\d+(\d{4})/g, '$1****$2')
}

// 手机号脱敏
export function mobile(mobile) {
  return mobile.replace(/(\d{3})\d*(\d{4})/g, '$1****$2')
}

// 银行卡号脱敏
export function bankCard(cardNo) {
  return cardNo.replace(/(\d{4})\d*(\d{4})/g, '$1****$2')
}

// 用户名脱敏
export function userName(name) {
  return name.replace(/[\u4e00-\u9fa5]/g, ($0, $1) => ($1 === 0 ? $0 : '*'))
}

// 邮箱脱敏
export function email(email) {
  const [username, domain] = email.split('@')
  return `${username.replace(/(\w)\w+/g, '$1*')}@${domain}`
}

export default {
  idCard,
  mobile,
  bankCard,
  userName,
  email
}
