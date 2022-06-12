import { post, get, put } from 'axios'
import { JWT } from '../helpers/localStorage'
import { API } from './baseUrl'

const searchVehicles = (value) => new Promise((resolve, reject) =>
  get(`${API}/api/vehicles?economic_number=${value}`, {
    headers: {
      Authorization: `Bearer ${JWT()}`,
    },
  })
  .then(({ data }) => resolve(data))
  .catch(({ response }) => reject(response))
  )

export { searchVehicles }
