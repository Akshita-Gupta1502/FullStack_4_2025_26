import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchJobById, applyToJob } from '../api/jobsApi'
import './JobDetail.css'

const MOCK = {
  id: 1, title: 'Senior React Developer', company: 'TechCorp', location: 'New York, NY',
  jobType: 'Full-time', salary: '$120k - $150k', category: 'Engineering',
  description: 'We are looking for an experienced React developer to join our growing team and build amazing products used by millions of users worldwide.',
  requirements: '5+ years React experience\nTypeScript proficiency\nREST API integration\nGit workflow',
  benefits: 'Health insurance\n401k matching\nRemote Fridays\nLearning budget',
  companyEmail: 'hr@techcorp.com', postedDate: '2026-04-20', applicationCount: 24
}

export default function JobDetail() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ applicantName: '', applicantEmail: '', phone: '', coverLetter: '' })

  useEffect(() => {
    fetchJobById(id)
      .then(res => setJob(res.data))
      .catch(() => setJob(MOCK))
      .finally(() => setLoading(false))
  }, [id])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleApply = async e => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await applyToJob(id, form)
      setSubmitted(true)
      setShowForm(false)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="loading-screen"><div className="spinner" /><p>Loading job...</p></div>
  if (!job) return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}><h2>Job not found</h2><Link to="/jobs">← Back to Jobs</Link></div>

  const typeColors = { 'Full-time': '#10b981', 'Part-time': '#f59e0b', 'Remote': '#6366f1', 'Contract': '#ef4444', 'Internship': '#8b5cf6' }
  const color = typeColors[job.jobType] || '#6366f1'

  return (
    <div className="job-detail-page">
      <div className="container job-detail-layout">
        {/* Main Content */}
        <div className="job-detail-main">
          <Link to="/jobs" className="back-link">← Back to Jobs</Link>

          <div className="job-detail-card">
            <div className="jd-header">
              <div className="jd-logo" style={{ background: color + '20', color }}>{job.company?.slice(0, 2).toUpperCase()}</div>
              <div>
                <h1>{job.title}</h1>
                <p className="jd-company">{job.company}</p>
              </div>
            </div>

            <div className="jd-tags">
              <span className="jd-badge" style={{ background: color + '15', color }}>🏷️ {job.jobType}</span>
              <span className="jd-badge">📍 {job.location}</span>
              {job.salary && <span className="jd-badge">💰 {job.salary}</span>}
              <span className="jd-badge">📂 {job.category}</span>
            </div>

            <section className="jd-section">
              <h3>About the Role</h3>
              <p>{job.description}</p>
            </section>

            {job.requirements && (
              <section className="jd-section">
                <h3>Requirements</h3>
                <ul>
                  {job.requirements.split('\n').filter(Boolean).map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </section>
            )}

            {job.benefits && (
              <section className="jd-section">
                <h3>Benefits</h3>
                <ul className="benefits-list">
                  {job.benefits.split('\n').filter(Boolean).map((b, i) => <li key={i}><span>✅</span>{b}</li>)}
                </ul>
              </section>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="job-detail-sidebar">
          <div className="apply-card">
            <div className="apply-stats">
              <div><span>{job.applicationCount}</span><small>Applicants</small></div>
              <div><span>{new Date(job.postedDate).toLocaleDateString()}</span><small>Posted</small></div>
            </div>

            {submitted ? (
              <div className="success-msg">
                <span>🎉</span>
                <h4>Application Sent!</h4>
                <p>Good luck! The team will be in touch.</p>
              </div>
            ) : (
              <>
                <button className="apply-btn" onClick={() => setShowForm(!showForm)}>
                  {showForm ? 'Cancel' : 'Apply Now'}
                </button>

                {showForm && (
                  <form className="apply-form" onSubmit={handleApply}>
                    <h4>Your Application</h4>
                    {error && <div className="form-error">{error}</div>}
                    <input name="applicantName" placeholder="Full Name *" value={form.applicantName} onChange={handleChange} required />
                    <input name="applicantEmail" type="email" placeholder="Email Address *" value={form.applicantEmail} onChange={handleChange} required />
                    <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
                    <textarea name="coverLetter" placeholder="Cover Letter (optional)" rows={4} value={form.coverLetter} onChange={handleChange} />
                    <button type="submit" className="submit-btn" disabled={submitting}>
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
                )}
              </>
            )}

            {job.companyEmail && (
              <a href={`mailto:${job.companyEmail}`} className="email-link">✉️ Contact: {job.companyEmail}</a>
            )}
          </div>

          <div className="similar-card">
            <h4>Share this Job</h4>
            <div className="share-btns">
              <button onClick={() => navigator.clipboard.writeText(window.location.href)}>📋 Copy Link</button>
              <a href={`mailto:?subject=${job.title}&body=${window.location.href}`}>✉️ Email</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
