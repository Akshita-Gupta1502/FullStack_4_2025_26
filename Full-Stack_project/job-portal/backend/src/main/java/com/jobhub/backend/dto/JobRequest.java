package com.jobhub.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JobRequest {
    @NotBlank private String title;
    @NotBlank private String company;
    @NotBlank private String location;
    @NotBlank private String jobType;
    private String salary;
    @NotBlank private String category;
    @NotBlank private String description;
    private String requirements;
    private String benefits;
    private String companyEmail;
}
