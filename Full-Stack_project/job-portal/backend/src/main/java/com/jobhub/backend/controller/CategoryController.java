package com.jobhub.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @GetMapping
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(List.of(
            "Engineering", "Design", "Marketing", "Data",
            "Management", "Finance", "Healthcare", "Education", "Sales", "Other"
        ));
    }
}
