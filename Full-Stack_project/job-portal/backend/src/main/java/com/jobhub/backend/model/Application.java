package com.jobhub.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @NotBlank
    private String applicantName;

    @Email
    @NotBlank
    private String applicantEmail;

    private String phone;

    @Column(length = 3000)
    private String coverLetter;

    private String resumeUrl;

    private String status = "PENDING";  // PENDING, REVIEWED, SHORTLISTED, REJECTED

    private LocalDateTime appliedAt;

    @PrePersist
    public void prePersist() {
        if (appliedAt == null) appliedAt = LocalDateTime.now();
    }
}
