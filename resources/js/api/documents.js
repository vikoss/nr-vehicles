import { post, get } from 'axios'
import { JWT } from '../helpers/localStorage'
import { API } from './baseUrl'

const storeDocument = ({ vehicleId, document }) => new Promise((resolve, reject) =>
  post(`${API}/api/vehicles/${vehicleId}/documents`, document, {
    headers: {
      Authorization: `Bearer ${JWT()}`,
    },
  })
  .then(({ data }) => resolve(data))
  .catch(({ response }) => reject(response))
  )

const getDocuments = (vehicleId) => new Promise((resolve, reject) =>
  get(`${API}/api/vehicles/${vehicleId}/documents`, {
    headers: {
      Authorization: `Bearer ${JWT()}`,
    },
  })
  .then(({ data }) => resolve(data))
  .catch(({ response }) => reject(response))
  )

export { storeDocument, getDocuments }
