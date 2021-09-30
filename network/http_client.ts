import axios, { AxiosInstance } from 'axios'
const BASE_URL = 'https://livescore-api.com/api-client'

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-type': 'application/json' },
})
