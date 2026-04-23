import { Link } from 'react-router-dom'
import './JobCard.css'

const typeColors = {
  'Full-time': '#10b981',
  'Part-time': '#f59e0b',
  'Remote': '#6366f1',
  'Contract': '#ef4444',
  'Internship': '#8b5cf6',
}

export default function JobCard({ job }) {
  const color = typeColors[job.jobType] || '#6366f1'
  const initials = job.company?.slice(0, 2).toUpperCase() || 'CO'

  return (
    <Link to={`/jobs/${job.id}`} className="job-card">
      <div className="job-card-header">
        <div className="company-logo" style={{ background: color + '20', color }}>
          {initials}
        </div>
        <div className="job-meta">
          <span className="job-type-badge" style={{ background: color + '15', color }}>
            {job.jobType}
          </span>
          <span className="job-date">{new Date(job.postedDate).toLocaleDateString()}</span>
        </div>
      </div>

      <h3 className="job-title">{job.title}</h3>
      <p className="job-company">{job.company}</p>

      <div className="job-tags">
        <span className="tag">📍 {job.location}</span>
        {job.salary && <span className="tag">💰 {job.salary}</span>}
        <span className="tag">🏷️ {job.category}</span>
      </div>

      <p className="job-description">{job.description?.slice(0, 100)}...</p>

      <div className="job-card-footer">
        <span className="apply-count">{job.applicationCount || 0} applicants</span>
        <span className="view-btn">View Details →</span>
      </div>
    </Link>
  )
}
