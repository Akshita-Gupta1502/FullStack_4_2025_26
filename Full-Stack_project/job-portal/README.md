# JobHub - Full Stack Job Portal

A complete job portal application built with React (frontend) and Spring Boot (backend).

## Features

✅ **Job Seekers:**
- Browse and search jobs
- Filter by job type, category, location
- View detailed job descriptions
- Apply to jobs with application form

✅ **Employers:**
- Post new job listings
- Manage job details

✅ **Backend:**
- RESTful API with Spring Boot
- H2 in-memory database (no setup needed)
- 10 sample jobs pre-loaded
- CORS enabled for frontend

## Tech Stack

**Frontend:**
- React 19
- React Router DOM
- Axios
- Vite
- CSS3

**Backend:**
- Spring Boot 3.2.5
- Spring Data JPA
- H2 Database
- Lombok
- Maven

## Quick Start

### Prerequisites
- Java 17 or higher
- Maven
- Node.js 16+ and npm

### Option 1: Using Batch Files (Windows)

1. **Start Backend:**
   - Double-click `start-backend.bat`
   - Wait for "Started BackendApplication" message
   - Backend runs on: http://localhost:8080

2. **Start Frontend:**
   - Double-click `start-frontend.bat`
   - Wait for "Local: http://localhost:5173"
   - Frontend runs on: http://localhost:5173

3. **Open Browser:**
   - Navigate to http://localhost:5173

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd job-portal/backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd job-portal/frontend
npm run dev
```

## API Endpoints

- `GET /api/jobs` - Get all jobs (with optional filters)
- `GET /api/jobs/{id}` - Get job by ID
- `POST /api/jobs` - Create new job
- `POST /api/jobs/{id}/apply` - Apply to job
- `GET /api/categories` - Get all categories

## Project Structure

```
job-portal/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/jobhub/backend/
│   │       ├── config/      # CORS, DataSeeder
│   │       ├── controller/  # REST controllers
│   │       ├── dto/         # Data transfer objects
│   │       ├── model/       # JPA entities
│   │       ├── repository/  # Data repositories
│   │       └── service/     # Business logic
│   └── pom.xml
│
├── frontend/                # React frontend
│   ├── src/
│   │   ├── api/            # API client
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   └── package.json
│
├── start-backend.bat       # Windows batch file
└── start-frontend.bat      # Windows batch file
```

## Sample Data

The application comes with 10 pre-loaded job listings across various categories:
- Engineering (React, Java, DevOps)
- Design (UI/UX)
- Management (Product Manager)
- Data Science
- Marketing
- Finance
- Healthcare

## Database

Uses H2 in-memory database. Data resets on restart.

Access H2 Console: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:jobhubdb`
- Username: `sa`
- Password: (leave empty)

## Troubleshooting

**Backend won't start:**
- Ensure Java 17+ is installed: `java -version`
- Ensure Maven is installed: `mvn -version`
- Check port 8080 is not in use

**Frontend won't start:**
- Ensure Node.js is installed: `node -version`
- Run `npm install` in frontend directory
- Check port 5173 is not in use

**API calls failing:**
- Ensure backend is running on port 8080
- Check browser console for CORS errors
- Verify proxy settings in `vite.config.js`

## License

MIT License - Free to use for learning and demonstration purposes.
