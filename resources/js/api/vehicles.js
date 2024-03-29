import { post, get, put, delete as destroy } from 'axios'
import { JWT } from '../helpers/LocalStorage'
import { API } from './baseUrl'

const searchVehicles = ({ inventoryNumber, page }) => new Promise((resolve, reject) =>
  get(`${API}/api/vehicles?page=${page}${inventoryNumber ? '&inventory_number='+inventoryNumber : ''}`, {
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

const storeVehicle = (vehicle) => new Promise((resolve, reject) =>
  post(`${API}/api/vehicles`, vehicle, {
    headers: {
      Authorization: `Bearer ${JWT()}`,
    },
  })
  .then(({ data }) => resolve(data))
  .catch(({ response }) => reject(response))
  )

const destroyVehicle = (vehicle) => new Promise((resolve, reject) =>
  destroy(`${API}/api/vehicles/${vehicle}`, {
    headers: {
      Authorization: `Bearer ${JWT()}`,
    },
  })
  .then(({ data }) => resolve(data))
  .catch(({ response }) => reject(response))
  )

export { searchVehicles, getVehicle, updateVehicle, storeVehicle, destroyVehicle }
