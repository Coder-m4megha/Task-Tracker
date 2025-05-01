import { useState, useEffect } from 'react'
import { getProjects } from '../services/api'
import ProjectCard from '../components/ProjectCard'
import CreateProjectModal from '../components/CreateProjectModal'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const { user } = useAuth()
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        setError('Failed to fetch projects')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProjects()
  }, [])
  
  const handleProjectCreated = (newProject) => {
    setProjects(prev => [...prev, newProject])
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
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Projects</h1>
        {projects.length < 4 && (
          <button 
            className="btn btn-primary" 
            data-bs-toggle="modal" 
            data-bs-target="#createProjectModal"
          >
            <i className="fas fa-plus me-2"></i>
            Create Project
          </button>
        )}
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-project-diagram fa-4x mb-3 text-muted"></i>
          <h3>No Projects Yet</h3>
          <p className="text-muted">
            Create your first project to get started with task tracking.
          </p>
          <button 
            className="btn btn-primary mt-3" 
            data-bs-toggle="modal" 
            data-bs-target="#createProjectModal"
          >
            <i className="fas fa-plus me-2"></i>
            Create Project
          </button>
        </div>
      ) : (
        <div className="row">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
      
      {/* Create Project Modal */}
      <CreateProjectModal onProjectCreated={handleProjectCreated} />
    </div>
  )
}

export default Dashboard
