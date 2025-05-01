import axios from 'axios'
import { toast } from 'react-toastify'

// Project API calls
export const getProjects = async () => {
  try {
    const res = await axios.get('/api/projects')
    return res.data.data
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch projects'
    toast.error(message)
    throw error
  }
}

export const getProject = async (id) => {
  try {
    const res = await axios.get(`/api/projects/${id}`)
    return res.data.data
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch project'
    toast.error(message)
    throw error
  }
}

export const createProject = async (projectData) => {
  try {
    const res = await axios.post('/api/projects', projectData)
    toast.success('Project created successfully!')
    return res.data.data
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to create project'
    toast.error(message)
    throw error
  }
}

export const updateProject = async (id, projectData) => {
  try {
    const res = await axios.put(`/api/projects/${id}`, projectData)
    toast.success('Project updated successfully!')
    return res.data.data
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to update project'
    toast.error(message)
    throw error
  }
}

export const deleteProject = async (id) => {
  try {
    await axios.delete(`/api/projects/${id}`)
    toast.success('Project deleted successfully!')
    return true
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to delete project'
    toast.error(message)
    throw error
  }
}

// Task API calls
export const getTasks = async () => {
  try {
    const res = await axios.get('/api/tasks')
    return res.data.data
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch tasks'
    toast.error(message)
    throw error
  }
}

export const getTask = async (id) => {
  try {
    const res = await axios.get(`/api/tasks/${id}`)
    return res.data.data
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch task'
    toast.error(message)
    throw error
  }
}

export const createTask = async (taskData) => {
  try {
    const res = await axios.post('/api/tasks', taskData)
    toast.success('Task created successfully!')
    return res.data.data
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to create task'
    toast.error(message)
    throw error
  }
}

export const updateTask = async (id, taskData) => {
  try {
    const res = await axios.put(`/api/tasks/${id}`, taskData)
    toast.success('Task updated successfully!')
    return res.data.data
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to update task'
    toast.error(message)
    throw error
  }
}

export const deleteTask = async (id) => {
  try {
    await axios.delete(`/api/tasks/${id}`)
    toast.success('Task deleted successfully!')
    return true
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to delete task'
    toast.error(message)
    throw error
  }
}
