package com.jobhub.backend.dto;

import com.jobhub.backend.model.Application;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApplicationResponse {
    private Long id;
    private Long jobId;
    private String jobTitle;
    private String applicantName;
    private String applicantEmail;
    private String phone;
    private String coverLetter;
    private String status;
    private LocalDateTime appliedAt;

    public static ApplicationResponse from(Application a) {
        ApplicationResponse r = new ApplicationResponse();
        r.id = a.getId();
        r.jobId = a.getJob().getId();
        r.jobTitle = a.getJob().getTitle();
        r.applicantName = a.getApplicantName();
        r.applicantEmail = a.getApplicantEmail();
        r.phone = a.getPhone();
        r.coverLetter = a.getCoverLetter();
        r.status = a.getStatus();
        r.appliedAt = a.getAppliedAt();
        return r;
    }
}
