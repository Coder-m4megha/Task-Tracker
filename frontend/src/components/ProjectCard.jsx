import { Link } from 'react-router-dom'

const ProjectCard = ({ project }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card project-card h-100">
        <div className="card-body">
          <h5 className="card-title">{project.title}</h5>
          <p className="card-text">{project.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="badge bg-primary">
              {project.tasks?.length || 0} Tasks
            </span>
            <small className="text-muted">
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </small>
          </div>
        </div>
        <div className="card-footer bg-transparent border-top-0">
          <Link 
            to={`/dashboard/projects/${project._id}`} 
            className="btn btn-primary w-100"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
