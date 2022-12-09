import axios from './axios.js'

export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(
        response => resolve(response),
        error => reject(error)
      )
      .catch(error => reject(error))
  })
}

export const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        response => resolve(response),
        error => reject(error)
      )
      .catch(error => reject(error))
  })
}

export default { get, post }
