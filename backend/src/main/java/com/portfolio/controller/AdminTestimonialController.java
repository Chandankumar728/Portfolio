package com.portfolio.controller;

import com.portfolio.model.Testimonial;
import com.portfolio.repository.TestimonialRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/testimonials")
public class AdminTestimonialController {
  private final TestimonialRepository testimonialRepository;

  public AdminTestimonialController(TestimonialRepository testimonialRepository) {
    this.testimonialRepository = testimonialRepository;
  }

  @GetMapping
  public List<Testimonial> findAll() {
    return testimonialRepository.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Testimonial> findById(@PathVariable Long id) {
    return testimonialRepository.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public Testimonial create(@Valid @RequestBody Testimonial testimonial) {
    testimonial.setId(null);
    return testimonialRepository.save(testimonial);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Testimonial> update(@PathVariable Long id, @Valid @RequestBody Testimonial testimonial) {
    if (!testimonialRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    testimonial.setId(id);
    return ResponseEntity.ok(testimonialRepository.save(testimonial));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    if (!testimonialRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    testimonialRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
