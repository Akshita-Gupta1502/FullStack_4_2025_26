import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api'

const api = axios.create({ baseURL: BASE_URL })

export const fetchJobs = (params) => api.get('/jobs', { params })
export const fetchJobById = (id) => api.get(`/jobs/${id}`)
export const createJob = (data) => api.post('/jobs', data)
export const applyToJob = (jobId, data) => api.post(`/jobs/${jobId}/apply`, data)
export const fetchCategories = () => api.get('/categories')
