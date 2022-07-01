import { post, get, put } from 'axios'
import { JWT } from '../helpers/localStorage'
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

export { searchVehicles, getVehicle }
