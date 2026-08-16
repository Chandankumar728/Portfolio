package com.portfolio.controller;

import com.portfolio.model.Certification;
import com.portfolio.repository.CertificationRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/certifications")
public class AdminCertificationController {
  private final CertificationRepository certificationRepository;

  public AdminCertificationController(CertificationRepository certificationRepository) {
    this.certificationRepository = certificationRepository;
  }

  @GetMapping
  public List<Certification> findAll() {
    return certificationRepository.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Certification> findById(@PathVariable Long id) {
    return certificationRepository.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public Certification create(@Valid @RequestBody Certification certification) {
    certification.setId(null);
    return certificationRepository.save(certification);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Certification> update(@PathVariable Long id, @Valid @RequestBody Certification certification) {
    if (!certificationRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    certification.setId(id);
    return ResponseEntity.ok(certificationRepository.save(certification));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    if (!certificationRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    certificationRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
