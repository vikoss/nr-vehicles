import { get } from 'axios'
import { JWT } from '../helpers/LocalStorage'
import { API } from './baseUrl'

const getDirections = () => new Promise((resolve, reject) =>
  get(`${API}/api/directions`, {
    headers: {
      Authorization: `Bearer ${JWT()}`,
    },
  })
  .then(({ data }) => resolve(data))
  .catch(({ response }) => reject(response))
  )

export { getDirections }
