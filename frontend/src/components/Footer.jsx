const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Task Tracker</h5>
            <p>A simple application to track your projects and tasks.</p>
          </div>
          <div className="col-md-3">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/login" className="text-white">Login</a></li>
              <li><a href="/register" className="text-white">Register</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li><i className="fas fa-envelope me-2"></i> yadavmegha241@gmail.com</li>
              <li><i className="fas fa-phone me-2"></i> (123) 456-7890</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Task Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
