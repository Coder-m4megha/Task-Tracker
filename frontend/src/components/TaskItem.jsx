import { useState } from 'react'
import { updateTask, deleteTask } from '../services/api'

const TaskItem = ({ task, onTaskUpdate, onTaskDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatedTask = await updateTask(task._id, formData)
      onTaskUpdate(updatedTask)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task._id)
        onTaskDelete(task._id)
      } catch (error) {
        console.error('Failed to delete task:', error)
      }
    }
  }
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'todo':
        return 'status-todo'
      case 'in-progress':
        return 'status-in-progress'
      case 'completed':
        return 'status-completed'
      default:
        return ''
    }
  }
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Not completed'
    return new Date(dateString).toLocaleDateString()
  }
  
  return (
    <div className={`task-item ${task.status}`}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="d-flex justify-content-end">
            <button 
              type="button" 
              className="btn btn-secondary me-2"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="mb-0">{task.title}</h5>
            <span className={`task-status ${getStatusClass(task.status)}`}>
              {task.status === 'todo' ? 'To Do' : 
               task.status === 'in-progress' ? 'In Progress' : 'Completed'}
            </span>
          </div>
          <p className="mb-2">{task.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Created: {new Date(task.createdAt).toLocaleDateString()}
              {task.status === 'completed' && ` | Completed: ${formatDate(task.completedAt)}`}
            </small>
            <div>
              <button 
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => setIsEditing(true)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button 
                className="btn btn-sm btn-outline-danger"
                onClick={handleDelete}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TaskItem
