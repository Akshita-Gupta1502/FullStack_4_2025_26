import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import JobCard from '../components/JobCard'
import { fetchJobs } from '../api/jobsApi'
import './Jobs.css'

const MOCK_JOBS = [
  { id: 1, title: 'Senior React Developer', company: 'TechCorp', location: 'New York, NY', jobType: 'Full-time', salary: '$120k - $150k', category: 'Engineering', description: 'We are looking for an experienced React developer to join our growing team and build amazing products.', postedDate: '2026-04-20', applicationCount: 24 },
  { id: 2, title: 'UI/UX Designer', company: 'DesignStudio', location: 'Remote', jobType: 'Remote', salary: '$80k - $100k', category: 'Design', description: 'Join our creative team to design beautiful and intuitive user interfaces for our clients worldwide.', postedDate: '2026-04-19', applicationCount: 18 },
  { id: 3, title: 'Backend Java Engineer', company: 'FinanceApp', location: 'San Francisco, CA', jobType: 'Full-time', salary: '$130k - $160k', category: 'Engineering', description: 'Build scalable backend services using Java and Spring Boot for our financial platform.', postedDate: '2026-04-18', applicationCount: 31 },
  { id: 4, title: 'Product Manager', company: 'StartupXYZ', location: 'Austin, TX', jobType: 'Full-time', salary: '$110k - $140k', category: 'Management', description: 'Lead product strategy and work closely with engineering and design teams to ship great features.', postedDate: '2026-04-17', applicationCount: 12 },
  { id: 5, title: 'Data Scientist', company: 'DataCo', location: 'Remote', jobType: 'Remote', salary: '$100k - $130k', category: 'Data', description: 'Analyze large datasets and build machine learning models to drive business insights.', postedDate: '2026-04-16', applicationCount: 9 },
  { id: 6, title: 'DevOps Engineer', company: 'CloudSys', location: 'Seattle, WA', jobType: 'Contract', salary: '$90/hr', category: 'Engineering', description: 'Manage CI/CD pipelines, cloud infrastructure, and ensure high availability of our systems.', postedDate: '2026-04-15', applicationCount: 7 },
  { id: 7, title: 'Marketing Manager', company: 'BrandCo', location: 'Chicago, IL', jobType: 'Full-time', salary: '$75k - $95k', category: 'Marketing', description: 'Drive marketing campaigns and brand awareness across digital and traditional channels.', postedDate: '2026-04-14', applicationCount: 15 },
  { id: 8, title: 'Frontend Intern', company: 'WebAgency', location: 'Remote', jobType: 'Internship', salary: '$20/hr', category: 'Engineering', description: 'Great opportunity for students to gain hands-on experience building web applications.', postedDate: '2026-04-13', applicationCount: 42 },
  { id: 9, title: 'Financial Analyst', company: 'InvestCorp', location: 'Boston, MA', jobType: 'Full-time', salary: '$85k - $110k', category: 'Finance', description: 'Analyze financial data and provide insights to support strategic business decisions.', postedDate: '2026-04-12', applicationCount: 6 },
]

const JOB_TYPES = ['All', 'Full-time', 'Part-time', 'Remote', 'Contract', 'Internship']
const CATEGORIES = ['All', 'Engineering', 'Design', 'Marketing', 'Data', 'Management', 'Finance', 'Healthcare', 'Education']

export default function Jobs() {
  const [searchParams] = useSearchParams()
  const [jobs, setJobs] = useState(MOCK_JOBS)
  const [filtered, setFiltered] = useState(MOCK_JOBS)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [jobType, setJobType] = useState('All')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    fetchJobs()
      .then(res => { if (res.data?.length) setJobs(res.data) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    let result = [...jobs]
    if (search) result = result.filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()))
    if (location) result = result.filter(j => j.location.toLowerCase().includes(location.toLowerCase()))
    if (jobType !== 'All') result = result.filter(j => j.jobType === jobType)
    if (category !== 'All') result = result.filter(j => j.category === category)
    if (sortBy === 'newest') result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
    if (sortBy === 'applicants') result.sort((a, b) => b.applicationCount - a.applicationCount)
    setFiltered(result)
  }, [jobs, search, location, jobType, category, sortBy])

  return (
    <div className="jobs-page">
      <div className="jobs-hero">
        <div className="container">
          <h1>Browse All Jobs</h1>
          <p>{filtered.length} jobs found</p>
          <div className="jobs-search-bar">
            <input
              type="text"
              placeholder="🔍  Search job title or company..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <input
              type="text"
              placeholder="📍  Location or Remote"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container jobs-layout">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filter-group">
            <h4>Job Type</h4>
            {JOB_TYPES.map(t => (
              <label key={t} className={`filter-option ${jobType === t ? 'selected' : ''}`}>
                <input type="radio" name="jobType" checked={jobType === t} onChange={() => setJobType(t)} />
                {t}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            {CATEGORIES.map(c => (
              <label key={c} className={`filter-option ${category === c ? 'selected' : ''}`}>
                <input type="radio" name="category" checked={category === c} onChange={() => setCategory(c)} />
                {c}
              </label>
            ))}
          </div>

          <button className="clear-filters" onClick={() => { setSearch(''); setLocation(''); setJobType('All'); setCategory('All') }}>
            Clear All Filters
          </button>
        </aside>

        {/* Job Listings */}
        <div className="jobs-main">
          <div className="jobs-toolbar">
            <span className="results-count">{filtered.length} results</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select">
              <option value="newest">Newest First</option>
              <option value="applicants">Most Applicants</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="no-results">
              <span>😕</span>
              <h3>No jobs found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="jobs-list">
              {filtered.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
