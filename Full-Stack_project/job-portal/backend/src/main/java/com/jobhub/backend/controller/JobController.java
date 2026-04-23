package com.jobhub.backend.controller;

import com.jobhub.backend.dto.ApplicationRequest;
import com.jobhub.backend.dto.ApplicationResponse;
import com.jobhub.backend.dto.JobRequest;
import com.jobhub.backend.dto.JobResponse;
import com.jobhub.backend.service.ApplicationService;
import com.jobhub.backend.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;
    private final ApplicationService applicationService;

    // GET /api/jobs?search=&location=&jobType=&category=
    @GetMapping
    public ResponseEntity<List<JobResponse>> getJobs(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String category) {
        return ResponseEntity.ok(jobService.getAllJobs(search, location, jobType, category));
    }

    // GET /api/jobs/{id}
    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJob(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    // POST /api/jobs
    @PostMapping
    public ResponseEntity<JobResponse> createJob(@Valid @RequestBody JobRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobService.createJob(req));
    }

    // PUT /api/jobs/{id}
    @PutMapping("/{id}")
    public ResponseEntity<JobResponse> updateJob(@PathVariable Long id, @Valid @RequestBody JobRequest req) {
        return ResponseEntity.ok(jobService.updateJob(id, req));
    }

    // DELETE /api/jobs/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok(Map.of("message", "Job deleted successfully"));
    }

    // POST /api/jobs/{id}/apply
    @PostMapping("/{id}/apply")
    public ResponseEntity<ApplicationResponse> apply(
            @PathVariable Long id,
            @Valid @RequestBody ApplicationRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(applicationService.apply(id, req));
    }

    // GET /api/jobs/{id}/applications
    @GetMapping("/{id}/applications")
    public ResponseEntity<List<ApplicationResponse>> getApplications(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.getApplicationsForJob(id));
    }
}
