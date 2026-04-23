import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>💼 JobHub</h3>
          <p>Find your dream job or hire the best talent.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/jobs">Browse Jobs</a>
          <a href="/post-job">Post a Job</a>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@jobhub.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 JobHub. All rights reserved.</p>
      </div>
    </footer>
  )
}
