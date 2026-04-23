import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createJob } from '../api/jobsApi'
import './PostJob.css'

const JOB_TYPES = ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship']
const CATEGORIES = ['Engineering', 'Design', 'Marketing', 'Data', 'Management', 'Finance', 'Healthcare', 'Education', 'Sales', 'Other']

export default function PostJob() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '', company: '', location: '', jobType: 'Full-time', salary: '',
    category: 'Engineering', description: '', requirements: '', benefits: '', companyEmail: ''
  })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await createJob(form)
      navigate(`/jobs/${res.data.id}`)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to post job. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="post-job-page">
      <div className="post-hero">
        <div className="container">
          <h1>Post a Job</h1>
          <p>Reach thousands of qualified candidates</p>
        </div>
      </div>

      <div className="container post-job-content">
        <form className="post-job-form" onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}

          <div className="form-section">
            <h3>Job Details</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Job Title *</label>
                <input name="title" placeholder="e.g. Senior React Developer" value={form.title} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label>Company Name *</label>
                <input name="company" placeholder="e.g. TechCorp" value={form.company} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label>Location *</label>
                <input name="location" placeholder="e.g. New York, NY or Remote" value={form.location} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label>Job Type *</label>
                <select name="jobType" value={form.jobType} onChange={handleChange} required>
                  {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="form-field">
                <label>Salary Range</label>
                <input name="salary" placeholder="e.g. $80k - $100k" value={form.salary} onChange={handleChange} />
              </div>

              <div className="form-field">
                <label>Category *</label>
                <select name="category" value={form.category} onChange={handleChange} required>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Job Description *</h3>
            <textarea
              name="description"
              placeholder="Describe the role, responsibilities, and what makes this opportunity great..."
              rows={6}
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-section">
            <h3>Requirements</h3>
            <textarea
              name="requirements"
              placeholder="List the required skills, experience, and qualifications (one per line)..."
              rows={5}
              value={form.requirements}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <h3>Benefits</h3>
            <textarea
              name="benefits"
              placeholder="List the benefits and perks (one per line)..."
              rows={4}
              value={form.benefits}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <h3>Contact Information</h3>
            <div className="form-field">
              <label>Company Email</label>
              <input
                name="companyEmail"
                type="email"
                placeholder="e.g. hr@company.com"
                value={form.companyEmail}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate('/jobs')}>Cancel</button>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>

        <aside className="post-sidebar">
          <div className="info-card">
            <h4>💡 Tips for a Great Job Post</h4>
            <ul>
              <li>Be clear and specific about the role</li>
              <li>Highlight what makes your company unique</li>
              <li>List realistic requirements</li>
              <li>Include salary range for transparency</li>
              <li>Mention benefits and perks</li>
              <li>Use inclusive language</li>
            </ul>
          </div>

          <div className="info-card">
            <h4>📊 Why Post on JobHub?</h4>
            <ul>
              <li>✅ Reach 85,000+ candidates</li>
              <li>✅ Free to post</li>
              <li>✅ Easy application tracking</li>
              <li>✅ Quick setup</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
