package com.jobhub.backend.service;

import com.jobhub.backend.dto.ApplicationRequest;
import com.jobhub.backend.dto.ApplicationResponse;
import com.jobhub.backend.model.Application;
import com.jobhub.backend.model.Job;
import com.jobhub.backend.repository.ApplicationRepository;
import com.jobhub.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;

    public ApplicationResponse apply(Long jobId, ApplicationRequest req) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + jobId));

        if (applicationRepository.existsByJobIdAndApplicantEmail(jobId, req.getApplicantEmail())) {
            throw new RuntimeException("You have already applied to this job.");
        }

        Application app = new Application();
        app.setJob(job);
        app.setApplicantName(req.getApplicantName());
        app.setApplicantEmail(req.getApplicantEmail());
        app.setPhone(req.getPhone());
        app.setCoverLetter(req.getCoverLetter());
        app.setResumeUrl(req.getResumeUrl());

        return ApplicationResponse.from(applicationRepository.save(app));
    }

    public List<ApplicationResponse> getApplicationsForJob(Long jobId) {
        return applicationRepository.findByJobId(jobId)
                .stream()
                .map(ApplicationResponse::from)
                .toList();
    }
}
