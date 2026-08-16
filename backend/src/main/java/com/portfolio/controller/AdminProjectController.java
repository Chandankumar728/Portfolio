package com.portfolio.controller;

import com.portfolio.model.Project;
import com.portfolio.repository.ProjectRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/projects")
public class AdminProjectController {
  private final ProjectRepository projectRepository;

  public AdminProjectController(ProjectRepository projectRepository) {
    this.projectRepository = projectRepository;
  }

  @GetMapping
  public List<Project> findAll() {
    return projectRepository.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Project> findById(@PathVariable Long id) {
    return projectRepository.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public Project create(@Valid @RequestBody Project project) {
    project.setId(null);
    return projectRepository.save(project);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Project> update(@PathVariable Long id, @Valid @RequestBody Project project) {
    if (!projectRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    project.setId(id);
    return ResponseEntity.ok(projectRepository.save(project));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    if (!projectRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    projectRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
