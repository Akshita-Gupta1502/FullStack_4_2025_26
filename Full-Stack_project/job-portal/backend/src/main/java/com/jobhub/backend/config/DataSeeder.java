package com.jobhub.backend.config;

import com.jobhub.backend.model.Job;
import com.jobhub.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final JobRepository jobRepository;

    @Override
    public void run(String... args) {
        if (jobRepository.count() > 0) return;

        jobRepository.saveAll(List.of(
            job("Senior React Developer", "TechCorp", "New York, NY", "Full-time", "$120k - $150k", "Engineering",
                "We are looking for an experienced React developer to join our growing team and build amazing products used by millions.",
                "5+ years React experience\nTypeScript proficiency\nREST API integration\nGit workflow",
                "Health insurance\n401k matching\nRemote Fridays\nLearning budget", "hr@techcorp.com", -3),

            job("UI/UX Designer", "DesignStudio", "Remote", "Remote", "$80k - $100k", "Design",
                "Join our creative team to design beautiful and intuitive user interfaces for our clients worldwide.",
                "3+ years UI/UX experience\nFigma expert\nUser research skills\nPortfolio required",
                "Fully remote\nFlexible hours\nEquipment budget\nConference allowance", "jobs@designstudio.io", -4),

            job("Backend Java Engineer", "FinanceApp", "San Francisco, CA", "Full-time", "$130k - $160k", "Engineering",
                "Build scalable backend services using Java and Spring Boot for our high-traffic financial platform.",
                "4+ years Java/Spring Boot\nMicroservices architecture\nSQL & NoSQL databases\nAWS experience",
                "Competitive salary\nStock options\nMedical & dental\nGym membership", "careers@financeapp.com", -5),

            job("Product Manager", "StartupXYZ", "Austin, TX", "Full-time", "$110k - $140k", "Management",
                "Lead product strategy and work closely with engineering and design teams to ship great features.",
                "3+ years PM experience\nAgile/Scrum\nData-driven mindset\nExcellent communication",
                "Equity package\nHealth benefits\nUnlimited PTO\nHome office stipend", "pm@startupxyz.com", -6),

            job("Data Scientist", "DataCo", "Remote", "Remote", "$100k - $130k", "Data",
                "Analyze large datasets and build machine learning models to drive business insights and product decisions.",
                "Python & R proficiency\nML frameworks (TensorFlow/PyTorch)\nSQL expertise\nStatistics background",
                "Remote-first\nConference budget\nPublishing support\nFlexible schedule", "data@dataco.ai", -7),

            job("DevOps Engineer", "CloudSys", "Seattle, WA", "Contract", "$90/hr", "Engineering",
                "Manage CI/CD pipelines, cloud infrastructure, and ensure high availability of our distributed systems.",
                "Kubernetes & Docker\nAWS/GCP/Azure\nTerraform\nMonitoring tools (Grafana, Prometheus)",
                "Competitive hourly rate\nFlexible contract\nRemote option\nEquipment provided", "devops@cloudsys.com", -8),

            job("Marketing Manager", "BrandCo", "Chicago, IL", "Full-time", "$75k - $95k", "Marketing",
                "Drive marketing campaigns and brand awareness across digital and traditional channels for our growing brand.",
                "5+ years marketing experience\nSEO/SEM knowledge\nContent strategy\nAnalytics tools",
                "Health & dental\nBonus structure\nCreative freedom\nTeam events", "marketing@brandco.com", -9),

            job("Frontend Intern", "WebAgency", "Remote", "Internship", "$20/hr", "Engineering",
                "Great opportunity for students to gain hands-on experience building real web applications with a supportive team.",
                "Basic HTML/CSS/JS\nReact basics\nEagerness to learn\nCurrently enrolled in CS program",
                "Mentorship program\nFlexible hours\nPotential full-time offer\nGreat portfolio builder", "intern@webagency.com", -10),

            job("Financial Analyst", "InvestCorp", "Boston, MA", "Full-time", "$85k - $110k", "Finance",
                "Analyze financial data and provide insights to support strategic business decisions and investment strategies.",
                "Finance or Accounting degree\nExcel & financial modeling\nCFA preferred\n3+ years experience",
                "Performance bonus\nRetirement plan\nProfessional development\nCentral office location", "finance@investcorp.com", -11),

            job("Healthcare Data Analyst", "MedTech", "Remote", "Remote", "$90k - $115k", "Healthcare",
                "Work with healthcare data to improve patient outcomes and operational efficiency across our hospital network.",
                "Healthcare domain knowledge\nSQL & Python\nEHR systems experience\nHIPAA compliance knowledge",
                "Mission-driven work\nFull benefits\nRemote work\nImpact at scale", "data@medtech.com", -12)
        ));
    }

    private Job job(String title, String company, String location, String type, String salary,
                    String category, String description, String requirements, String benefits,
                    String email, int daysOffset) {
        Job j = new Job();
        j.setTitle(title);
        j.setCompany(company);
        j.setLocation(location);
        j.setJobType(type);
        j.setSalary(salary);
        j.setCategory(category);
        j.setDescription(description);
        j.setRequirements(requirements);
        j.setBenefits(benefits);
        j.setCompanyEmail(email);
        j.setPostedDate(LocalDate.now().plusDays(daysOffset));
        j.setActive(true);
        return j;
    }
}
