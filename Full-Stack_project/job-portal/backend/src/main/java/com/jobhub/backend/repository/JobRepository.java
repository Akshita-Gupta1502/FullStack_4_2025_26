package com.jobhub.backend.repository;

import com.jobhub.backend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    @Query("""
        SELECT j FROM Job j WHERE j.active = true
        AND (:search IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :search, '%'))
             OR LOWER(j.company) LIKE LOWER(CONCAT('%', :search, '%')))
        AND (:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))
        AND (:jobType IS NULL OR j.jobType = :jobType)
        AND (:category IS NULL OR j.category = :category)
        ORDER BY j.postedDate DESC
    """)
    List<Job> searchJobs(
        @Param("search") String search,
        @Param("location") String location,
        @Param("jobType") String jobType,
        @Param("category") String category
    );

    List<Job> findByActiveTrue();
}
