package com.portfolio.controller;

import com.portfolio.model.ExperienceItem;
import com.portfolio.repository.ExperienceItemRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/experience")
public class AdminExperienceController {
  private final ExperienceItemRepository experienceItemRepository;

  public AdminExperienceController(ExperienceItemRepository experienceItemRepository) {
    this.experienceItemRepository = experienceItemRepository;
  }

  @GetMapping
  public List<ExperienceItem> findAll() {
    return experienceItemRepository.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<ExperienceItem> findById(@PathVariable Long id) {
    return experienceItemRepository.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public ExperienceItem create(@Valid @RequestBody ExperienceItem experienceItem) {
    experienceItem.setId(null);
    return experienceItemRepository.save(experienceItem);
  }

  @PutMapping("/{id}")
  public ResponseEntity<ExperienceItem> update(@PathVariable Long id, @Valid @RequestBody ExperienceItem experienceItem) {
    if (!experienceItemRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    experienceItem.setId(id);
    return ResponseEntity.ok(experienceItemRepository.save(experienceItem));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    if (!experienceItemRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    experienceItemRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
