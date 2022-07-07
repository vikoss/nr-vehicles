import { post, get } from 'axios'
import { JWT } from '../helpers/LocalStorage'
import { API } from './baseUrl'
import { getCurrentTimestamp } from './../helpers/DateTime'

const authenticate = (credentials) => new Promise((resolve, reject) => {
  post(`${API}/api/auth/login`, credentials)
    .then(({ data }) => {
      localStorage.setItem('nr-vehicles-jwt', JSON.stringify({
        expiredAt: (data.expires_in * 1000) + getCurrentTimestamp(),
        accessToken: data.access_token,
        user: data.user,
      }))
      resolve(data)
    })
    .catch(({ response }) => reject(response))
})

const me = () => new Promise((resolve, reject) => {
  get(`${API}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${JWT()}`,
    },
  })
    .then(({ data }) => resolve(data))
    .catch(({ response }) => reject(response))
})

const logout = () => new Promise((resolve, reject) => {
  post(`${API}/api/auth/logout`, {}, {
    headers: {
      Authorization: `Bearer ${JWT()}`,
    },
  })
    .then(({ data }) => {
      localStorage.removeItem('nr-vehicles-jwt')
      resolve(data)
    })
    .catch(({ response }) => reject(response))
})

export { authenticate, me, logout }
