package com.jobhub.backend.dto;

import com.jobhub.backend.model.Job;
import lombok.Data;

import java.time.LocalDate;

@Data
public class JobResponse {
    private Long id;
    private String title;
    private String company;
    private String location;
    private String jobType;
    private String salary;
    private String category;
    private String description;
    private String requirements;
    private String benefits;
    private String companyEmail;
    private LocalDate postedDate;
    private int applicationCount;

    public static JobResponse from(Job job) {
        JobResponse r = new JobResponse();
        r.id = job.getId();
        r.title = job.getTitle();
        r.company = job.getCompany();
        r.location = job.getLocation();
        r.jobType = job.getJobType();
        r.salary = job.getSalary();
        r.category = job.getCategory();
        r.description = job.getDescription();
        r.requirements = job.getRequirements();
        r.benefits = job.getBenefits();
        r.companyEmail = job.getCompanyEmail();
        r.postedDate = job.getPostedDate();
        r.applicationCount = job.getApplicationCount();
        return r;
    }
}
