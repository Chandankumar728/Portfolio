package com.portfolio.controller;

import com.portfolio.model.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/messages")
public class AdminMessageController {
  private final ContactMessageRepository contactMessageRepository;

  public AdminMessageController(ContactMessageRepository contactMessageRepository) {
    this.contactMessageRepository = contactMessageRepository;
  }

  @GetMapping
  public List<ContactMessage> findAll() {
    return contactMessageRepository.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<ContactMessage> findById(@PathVariable Long id) {
    return contactMessageRepository.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    if (!contactMessageRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    contactMessageRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
