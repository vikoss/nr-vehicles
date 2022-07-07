import { post } from 'axios'
import { JWT } from '../helpers/LocalStorage'
import { API } from './baseUrl'

const uploadFile = ({ path, file }) => new Promise((resolve, reject) => {
  const body = new FormData()
  body.append('path', path)
  body.append('file', file)

  post(`${API}/api/upload-file`, body, {
    headers: {
      Authorization: `Bearer ${JWT()}`,
    },
  })
  .then(({ data }) => resolve(data))
  .catch(({ response }) => reject(response))
})

export { uploadFile }
