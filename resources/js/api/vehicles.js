import { post, get, put } from 'axios'
import { JWT } from '../helpers/LocalStorage'
import { API } from './baseUrl'

const searchVehicles = ({ economicNumber, page }) => new Promise((resolve, reject) =>
  get(`${API}/api/vehicles?page=${page}${economicNumber ? '&economic_number='+economicNumber : ''}`, {
    headers: {
      Authorization: `Bearer ${JWT()}`,
    },
  })
  .then(({ data }) => resolve(data))
  .catch(({ response }) => reject(response))
  )

const getVehicle = (vehicle) => new Promise((resolve, reject) =>
  get(`${API}/api/vehicles/${vehicle}`, {
    headers: {
      Authorization: `Bearer ${JWT()}`,
    },
  })
  .then(({ data }) => resolve(data))
  .catch(({ response }) => reject(response))
  )

const updateVehicle = ({ vehicleId, vehicle }) => new Promise((resolve, reject) =>
  put(`${API}/api/vehicles/${vehicleId}`, vehicle, {
    headers: {
      Authorization: `Bearer ${JWT()}`,
    },
  })
  .then(({ data }) => resolve(data))
  .catch(({ response }) => reject(response))
  )

export { searchVehicles, getVehicle, updateVehicle }
