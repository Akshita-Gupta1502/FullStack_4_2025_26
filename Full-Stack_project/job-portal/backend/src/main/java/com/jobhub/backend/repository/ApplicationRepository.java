package com.jobhub.backend.repository;

import com.jobhub.backend.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByJobId(Long jobId);
    boolean existsByJobIdAndApplicantEmail(Long jobId, String email);
}
