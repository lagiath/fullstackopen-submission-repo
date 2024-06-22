import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  console.log('Fetching blogs with config:', config)
  const response = await axios.get(baseUrl, config)
  console.log('Blogs fetched:', response.data)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  console.log('Creating new blog with config:', config)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, create, setToken }
