import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">💼</span>
          <span className="logo-text">JobHub</span>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={isActive('/') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/jobs" className={isActive('/jobs') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Browse Jobs</Link>
          <Link to="/post-job" className="btn-post" onClick={() => setMenuOpen(false)}>Post a Job</Link>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
