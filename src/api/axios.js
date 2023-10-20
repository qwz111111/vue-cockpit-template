import axios from 'axios'

axios.defaults.withCredentials = false
axios.defaults.timeout = 1000 * 10
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)
// 响应拦截
axios.interceptors.response.use(
  res => {
    if (typeof res.data !== 'object') {
      console.error('服务端异常！')
      return Promise.reject(res)
    }
    return res.data
  },
  error => {
    if (!error.config || !error.config.retry) {
      console.error('请求超时！')
    }
    return Promise.reject(error)
  }
)
export default axios
