package com.jobhub.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String company;

    @NotBlank
    private String location;

    @NotBlank
    private String jobType;   // Full-time, Part-time, Remote, Contract, Internship

    private String salary;

    @NotBlank
    private String category;

    @Column(length = 5000)
    @NotBlank
    private String description;

    @Column(length = 3000)
    private String requirements;

    @Column(length = 2000)
    private String benefits;

    private String companyEmail;

    private LocalDate postedDate;

    private boolean active = true;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Application> applications;

    @PrePersist
    public void prePersist() {
        if (postedDate == null) postedDate = LocalDate.now();
    }

    public int getApplicationCount() {
        return applications != null ? applications.size() : 0;
    }
}
