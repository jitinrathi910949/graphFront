import axios from 'axios'
import {store} from '../store'
import { push } from 'react-router-redux'
const instance = axios.create({
  // baseURI: config.baseURI,
  timeout: 1000 * 10,
  headers: { 'Content-Type': 'application/json' }
})

/**
 * Request interceptor
 * Add Authorization header if it exists
 * This configuration applies for all requests
 */
instance.interceptors.request.use(
  reqConfig => {
    // const access_token = localStorage.getItem('access_token');
    // const access_token = getCookie('token')

    if (!reqConfig.headers) {
      reqConfig.headers = {}
    }
    // reqConfig.headers.Authorization = `Bearer ${(access_token || '')}`
    reqConfig.timeout = 15000

    return reqConfig
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * Response interceptor
 * Catch basic errors like 401 and redirect to login
 * This configuration applies for all responses
 */
instance.interceptors.response.use(
  response => response,
  error => {
    // Do something with response error
    if (typeof error === 'undefined') {
      // request cancelled
      // when backend server is not available at all
    } else if (typeof error.response === 'undefined') {
      // when request is timeout
    } else if (error.response.status === 401) {
      // apply refresh token logic here instead of redirecting to login
      localStorage.clear()
      sessionStorage.clear()
      store.dispatch(push('/login'))
    }

    return Promise.reject(error.response)
  }
)

export default instance
