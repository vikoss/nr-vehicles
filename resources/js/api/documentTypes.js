import { post, get } from 'axios'
import { JWT } from '../helpers/localStorage'
import { API } from './baseUrl'

const getDocumentTypes = () => new Promise((resolve, reject) =>
  get(`${API}/api/document-types`, {
    headers: {
      Authorization: `Bearer ${JWT()}`,
    },
  })
  .then(({ data }) => resolve(data))
  .catch(({ response }) => reject(response))
  )

export { getDocumentTypes }
