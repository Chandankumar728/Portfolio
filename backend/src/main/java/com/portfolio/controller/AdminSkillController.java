package com.portfolio.controller;

import com.portfolio.model.Skill;
import com.portfolio.repository.SkillRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/skills")
public class AdminSkillController {
  private final SkillRepository skillRepository;

  public AdminSkillController(SkillRepository skillRepository) {
    this.skillRepository = skillRepository;
  }

  @GetMapping
  public List<Skill> findAll() {
    return skillRepository.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Skill> findById(@PathVariable Long id) {
    return skillRepository.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public Skill create(@Valid @RequestBody Skill skill) {
    skill.setId(null);
    return skillRepository.save(skill);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Skill> update(@PathVariable Long id, @Valid @RequestBody Skill skill) {
    if (!skillRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    skill.setId(id);
    return ResponseEntity.ok(skillRepository.save(skill));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    if (!skillRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    skillRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
