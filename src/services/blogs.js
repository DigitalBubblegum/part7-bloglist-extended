import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  // console.log(token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) =>
    response.data.slice().sort((a, b) => b.likes - a.likes),
  )
}

const create = async (blogObject) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const update = async (blogObject, id) => {
  // console.log('update')
  const response = await axios.put(`${baseUrl}/${id}`, blogObject)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  // console.log(response)
  return null
}
export default { getAll, setToken, create, update, remove }
