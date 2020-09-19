import axios from 'axios'

const request = axios.create({
  timeout: 7000,
  baseURL: 'https://apinew.juejin.im/',
  withCredentials: true
})

request.interceptors.request.use(config => {
  return config
}, error => {
  return error
})

request.interceptors.response.use(res => {
  return res.data
}, error => {
  return error
})

export default request
