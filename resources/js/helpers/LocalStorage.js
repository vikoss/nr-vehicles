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

const userRoles = () => {
  const user = currentUser()
  if (!user) {
    return []
  }

  return user.roles.map(role => role.name)
}

export { currentUser, JWT, expiredAt, isAuthenticated, userRoles }
