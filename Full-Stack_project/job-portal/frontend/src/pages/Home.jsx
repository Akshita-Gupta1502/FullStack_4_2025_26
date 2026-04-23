import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import JobCard from '../components/JobCard'
import { fetchJobs } from '../api/jobsApi'
import './Home.css'

const MOCK_JOBS = [
  { id: 1, title: 'Senior React Developer', company: 'TechCorp', location: 'New York, NY', jobType: 'Full-time', salary: '$120k - $150k', category: 'Engineering', description: 'We are looking for an experienced React developer to join our growing team and build amazing products.', postedDate: '2026-04-20', applicationCount: 24 },
  { id: 2, title: 'UI/UX Designer', company: 'DesignStudio', location: 'Remote', jobType: 'Remote', salary: '$80k - $100k', category: 'Design', description: 'Join our creative team to design beautiful and intuitive user interfaces for our clients worldwide.', postedDate: '2026-04-19', applicationCount: 18 },
  { id: 3, title: 'Backend Java Engineer', company: 'FinanceApp', location: 'San Francisco, CA', jobType: 'Full-time', salary: '$130k - $160k', category: 'Engineering', description: 'Build scalable backend services using Java and Spring Boot for our financial platform.', postedDate: '2026-04-18', applicationCount: 31 },
  { id: 4, title: 'Product Manager', company: 'StartupXYZ', location: 'Austin, TX', jobType: 'Full-time', salary: '$110k - $140k', category: 'Management', description: 'Lead product strategy and work closely with engineering and design teams to ship great features.', postedDate: '2026-04-17', applicationCount: 12 },
  { id: 5, title: 'Data Scientist', company: 'DataCo', location: 'Remote', jobType: 'Remote', salary: '$100k - $130k', category: 'Data', description: 'Analyze large datasets and build machine learning models to drive business insights.', postedDate: '2026-04-16', applicationCount: 9 },
  { id: 6, title: 'DevOps Engineer', company: 'CloudSys', location: 'Seattle, WA', jobType: 'Contract', salary: '$90/hr', category: 'Engineering', description: 'Manage CI/CD pipelines, cloud infrastructure, and ensure high availability of our systems.', postedDate: '2026-04-15', applicationCount: 7 },
]

const STATS = [
  { label: 'Jobs Posted', value: '12,400+', icon: '💼' },
  { label: 'Companies', value: '3,200+', icon: '🏢' },
  { label: 'Candidates', value: '85,000+', icon: '👥' },
  { label: 'Placements', value: '9,800+', icon: '🎯' },
]

const CATEGORIES = [
  { name: 'Engineering', icon: '⚙️', count: 1240 },
  { name: 'Design', icon: '🎨', count: 430 },
  { name: 'Marketing', icon: '📣', count: 320 },
  { name: 'Data', icon: '📊', count: 580 },
  { name: 'Management', icon: '📋', count: 290 },
  { name: 'Finance', icon: '💰', count: 410 },
  { name: 'Healthcare', icon: '🏥', count: 360 },
  { name: 'Education', icon: '📚', count: 210 },
]

export default function Home() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [jobs, setJobs] = useState(MOCK_JOBS)
  const navigate = useNavigate()

  useEffect(() => {
    fetchJobs()
      .then(res => { if (res.data?.length) setJobs(res.data) })
      .catch(() => {})
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/jobs?search=${search}&location=${location}`)
  }

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <div className="hero-badge">🚀 Over 12,000 jobs available</div>
          <h1>Find Your <span className="gradient-text">Dream Job</span> Today</h1>
          <p>Connect with top companies and discover opportunities that match your skills and passion.</p>

          <form className="search-bar" onSubmit={handleSearch}>
            <div className="search-field">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Job title, keywords..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="search-divider" />
            <div className="search-field">
              <span>📍</span>
              <input
                type="text"
                placeholder="Location or Remote"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
            <button type="submit" className="search-btn">Search Jobs</button>
          </form>

          <div className="hero-tags">
            <span>Popular:</span>
            {['React Developer', 'Data Scientist', 'Product Manager', 'Remote'].map(t => (
              <button key={t} onClick={() => navigate(`/jobs?search=${t}`)} className="hero-tag">{t}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container stats-grid">
          {STATS.map(s => (
            <div key={s.label} className="stat-card">
              <span className="stat-icon">{s.icon}</span>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Browse by Category</h2>
            <p>Explore jobs across different industries</p>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map(cat => (
              <button key={cat.name} className="category-card" onClick={() => navigate(`/jobs?category=${cat.name}`)}>
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-count">{cat.count} jobs</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Jobs</h2>
            <a href="/jobs" className="see-all">See all jobs →</a>
          </div>
          <div className="jobs-grid">
            {jobs.slice(0, 6).map(job => <JobCard key={job.id} job={job} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container cta-content">
          <h2>Ready to Hire Top Talent?</h2>
          <p>Post your job and reach thousands of qualified candidates today.</p>
          <a href="/post-job" className="cta-btn">Post a Job for Free</a>
        </div>
      </section>
    </div>
  )
}
