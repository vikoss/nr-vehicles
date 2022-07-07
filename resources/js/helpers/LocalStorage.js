import { getCurrentTimestamp } from './DateTime'

const currentUser = () => {
  const local = localStorage.getItem('nr-vehicles-jwt')
  if (!local) {
    return null
  }
  return JSON.parse(local).user
}

const JWT = () => {
  const local = localStorage.getItem('nr-vehicles-jwt')
  if (!local) {
    return null
  }
  return JSON.parse(local).accessToken
}

const expiredAt = () => {
  const local = localStorage.getItem('nr-vehicles-jwt')
  if (!local) {
    return null
  }
  return JSON.parse(local).expiredAt
}

const isAuthenticated = () => {
  const local = localStorage.getItem('nr-vehicles-jwt')
  if (!local) {
    return false
  }
  return getCurrentTimestamp() < expiredAt()
}

export { currentUser, JWT, expiredAt, isAuthenticated }
