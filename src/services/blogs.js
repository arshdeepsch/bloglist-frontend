import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getUser = async () => {
  let user = window.localStorage.getItem('loggedUser')
  user = JSON.parse(user)
  if (user === null) {
    return null
  }
  token = `bearer ${user.token}`
  return user
}

const create = async (obj) => {
  const result = await axios.post(baseUrl, obj, { headers: { Authorization: token } })
  return result
}

const remove = async (blog) => {
  const result = await axios.delete(`${baseUrl}/${blog.id}`, { headers: { Authorization: token } })
  return result
}

export default {
  getAll,
  getUser,
  create,
  setToken,
  remove
}