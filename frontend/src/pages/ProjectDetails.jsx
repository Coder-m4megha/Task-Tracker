import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProject, updateProject, deleteProject } from '../services/api'
import TaskItem from '../components/TaskItem'
import CreateTaskModal from '../components/CreateTaskModal'

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProject(id)
        setProject(data)
        setFormData({
          title: data.title,
          description: data.description
        })
      } catch (error) {
        setError('Failed to fetch project details')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProject()
  }, [id])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatedProject = await updateProject(id, formData)
      setProject(updatedProject)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update project:', error)
    }
  }
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project? This will also delete all tasks associated with it.')) {
      try {
        await deleteProject(id)
        navigate('/dashboard')
      } catch (error) {
        console.error('Failed to delete project:', error)
      }
    }
  }
  
  const handleTaskCreated = (newTask) => {
    setProject(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }))
  }
  
  const handleTaskUpdate = (updatedTask) => {
    setProject(prev => ({
      ...prev,
      tasks: prev.tasks.map(task => 
        task._id === updatedTask._id ? updatedTask : task
      )
    }))
  }
  
  const handleTaskDelete = (taskId) => {
    setProject(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task._id !== taskId)
    }))
  }
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )
  }
  
  if (!project) {
    return (
      <div className="alert alert-warning" role="alert">
        Project not found
      </div>
    )
  }
  
  // Group tasks by status
  const todoTasks = project.tasks.filter(task => task.status === 'todo')
  const inProgressTasks = project.tasks.filter(task => task.status === 'in-progress')
  const completedTasks = project.tasks.filter(task => task.status === 'completed')
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button 
          className="btn btn-outline-secondary" 
          onClick={() => navigate('/dashboard')}
        >
          <i className="fas fa-arrow-left me-2"></i>
          Back to Dashboard
        </button>
        <div>
          <button 
            className="btn btn-outline-primary me-2" 
            onClick={() => setIsEditing(true)}
            disabled={isEditing}
          >
            <i className="fas fa-edit me-2"></i>
            Edit Project
          </button>
          <button 
            className="btn btn-outline-danger" 
            onClick={handleDelete}
          >
            <i className="fas fa-trash me-2"></i>
            Delete Project
          </button>
        </div>
      </div>
      
      {isEditing ? (
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="card-title mb-4">Edit Project</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Project Title</label>
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
                  rows="3"
                  required
                ></textarea>
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
          </div>
        </div>
      ) : (
        <div className="card mb-4">
          <div className="card-body">
            <h1 className="card-title">{project.title}</h1>
            <p className="card-text">{project.description}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="badge bg-primary me-2">
                  {project.tasks.length} Tasks
                </span>
                <span className="badge bg-danger me-2">
                  {todoTasks.length} To Do
                </span>
                <span className="badge bg-warning me-2">
                  {inProgressTasks.length} In Progress
                </span>
                <span className="badge bg-success">
                  {completedTasks.length} Completed
                </span>
              </div>
              <small className="text-muted">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </small>
            </div>
          </div>
        </div>
      )}
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Tasks</h3>
        <button 
          className="btn btn-success" 
          data-bs-toggle="modal" 
          data-bs-target="#createTaskModal"
        >
          <i className="fas fa-plus me-2"></i>
          Add Task
        </button>
      </div>
      
      {project.tasks.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-tasks fa-4x mb-3 text-muted"></i>
          <h3>No Tasks Yet</h3>
          <p className="text-muted">
            Add tasks to start tracking your progress.
          </p>
          <button 
            className="btn btn-success mt-3" 
            data-bs-toggle="modal" 
            data-bs-target="#createTaskModal"
          >
            <i className="fas fa-plus me-2"></i>
            Add Task
          </button>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header bg-danger text-white">
                <h5 className="mb-0">To Do</h5>
              </div>
              <div className="card-body">
                {todoTasks.length === 0 ? (
                  <p className="text-center text-muted my-3">No tasks to do</p>
                ) : (
                  todoTasks.map(task => (
                    <TaskItem 
                      key={task._id} 
                      task={task} 
                      onTaskUpdate={handleTaskUpdate}
                      onTaskDelete={handleTaskDelete}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header bg-warning text-dark">
                <h5 className="mb-0">In Progress</h5>
              </div>
              <div className="card-body">
                {inProgressTasks.length === 0 ? (
                  <p className="text-center text-muted my-3">No tasks in progress</p>
                ) : (
                  inProgressTasks.map(task => (
                    <TaskItem 
                      key={task._id} 
                      task={task} 
                      onTaskUpdate={handleTaskUpdate}
                      onTaskDelete={handleTaskDelete}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">Completed</h5>
              </div>
              <div className="card-body">
                {completedTasks.length === 0 ? (
                  <p className="text-center text-muted my-3">No completed tasks</p>
                ) : (
                  completedTasks.map(task => (
                    <TaskItem 
                      key={task._id} 
                      task={task} 
                      onTaskUpdate={handleTaskUpdate}
                      onTaskDelete={handleTaskDelete}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Create Task Modal */}
      <CreateTaskModal 
        projectId={project._id} 
        onTaskCreated={handleTaskCreated} 
      />
    </div>
  )
}

export default ProjectDetails
