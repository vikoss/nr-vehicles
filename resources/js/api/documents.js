import { post, get, delete as destroy } from 'axios'
import { JWT } from '../helpers/LocalStorage'
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

const deleteDocument = (documentId) => new Promise((resolve, reject) =>
  destroy(`${API}/api/documents/${documentId}`, {
    headers: {
      Authorization: `Bearer ${JWT()}`,
    },
  })
  .then(({ data }) => resolve(data))
  .catch(({ response }) => reject(response))
  )

export { storeDocument, getDocuments, deleteDocument }
