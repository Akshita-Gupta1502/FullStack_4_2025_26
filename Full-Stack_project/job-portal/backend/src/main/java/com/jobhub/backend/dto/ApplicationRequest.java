package com.jobhub.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ApplicationRequest {
    @NotBlank private String applicantName;
    @Email @NotBlank private String applicantEmail;
    private String phone;
    private String coverLetter;
    private String resumeUrl;
}
