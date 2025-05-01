import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <section className="home-hero">
        <div className="container">
          <h1 className="display-4 fw-bold mb-4">Track Your Projects with Ease</h1>
          <p className="lead mb-4">
            A simple and intuitive task tracker to help you manage your projects and tasks efficiently.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg me-3">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-outline-light btn-lg">
            Login
          </Link>
        </div>
      </section>
      
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Features</h2>
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <div className="feature-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <h3>Project Management</h3>
              <p>Create and manage up to 4 projects with detailed information and progress tracking.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="feature-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <h3>Task Tracking</h3>
              <p>Create, update, and delete tasks with status tracking to monitor your progress.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="feature-icon">
                <i className="fas fa-user-shield"></i>
              </div>
              <h3>Secure Authentication</h3>
              <p>Secure user authentication with JWT to keep your projects and tasks private.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>Why Choose Task Tracker?</h2>
              <p className="lead">Our task tracker application provides a simple yet powerful way to manage your projects and tasks.</p>
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item bg-transparent">
                  <i className="fas fa-check text-success me-2"></i>
                  Easy to use interface
                </li>
                <li className="list-group-item bg-transparent">
                  <i className="fas fa-check text-success me-2"></i>
                  Real-time progress tracking
                </li>
                <li className="list-group-item bg-transparent">
                  <i className="fas fa-check text-success me-2"></i>
                  Secure and private
                </li>
                <li className="list-group-item bg-transparent">
                  <i className="fas fa-check text-success me-2"></i>
                  Accessible from anywhere
                </li>
              </ul>
              <Link to="/register" className="btn btn-primary">
                Sign Up Now
              </Link>
            </div>
            <div className="col-md-6">
              <img 
                src="https://via.placeholder.com/600x400?text=Task+Tracker" 
                alt="Task Tracker" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
