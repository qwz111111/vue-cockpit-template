import axios from 'axios'

const Axios = axios.create({})
Axios.defaults.withCredentials = false
Axios.defaults.timeout = 1000 * 10
Axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
Axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

Axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)
// 响应拦截
Axios.interceptors.response.use(
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
