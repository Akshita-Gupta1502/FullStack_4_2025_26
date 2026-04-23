package com.jobhub.backend.service;

import com.jobhub.backend.dto.JobRequest;
import com.jobhub.backend.dto.JobResponse;
import com.jobhub.backend.model.Job;
import com.jobhub.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;

    public List<JobResponse> getAllJobs(String search, String location, String jobType, String category) {
        String s = (search != null && search.isBlank()) ? null : search;
        String l = (location != null && location.isBlank()) ? null : location;
        String jt = (jobType != null && jobType.isBlank()) ? null : jobType;
        String cat = (category != null && category.isBlank()) ? null : category;

        return jobRepository.searchJobs(s, l, jt, cat)
                .stream()
                .map(JobResponse::from)
                .toList();
    }

    public JobResponse getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
        return JobResponse.from(job);
    }

    public JobResponse createJob(JobRequest req) {
        Job job = new Job();
        job.setTitle(req.getTitle());
        job.setCompany(req.getCompany());
        job.setLocation(req.getLocation());
        job.setJobType(req.getJobType());
        job.setSalary(req.getSalary());
        job.setCategory(req.getCategory());
        job.setDescription(req.getDescription());
        job.setRequirements(req.getRequirements());
        job.setBenefits(req.getBenefits());
        job.setCompanyEmail(req.getCompanyEmail());
        return JobResponse.from(jobRepository.save(job));
    }

    public JobResponse updateJob(Long id, JobRequest req) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
        job.setTitle(req.getTitle());
        job.setCompany(req.getCompany());
        job.setLocation(req.getLocation());
        job.setJobType(req.getJobType());
        job.setSalary(req.getSalary());
        job.setCategory(req.getCategory());
        job.setDescription(req.getDescription());
        job.setRequirements(req.getRequirements());
        job.setBenefits(req.getBenefits());
        job.setCompanyEmail(req.getCompanyEmail());
        return JobResponse.from(jobRepository.save(job));
    }

    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
        job.setActive(false);
        jobRepository.save(job);
    }
}
