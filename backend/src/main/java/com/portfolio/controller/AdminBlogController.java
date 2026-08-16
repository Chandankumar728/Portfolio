package com.portfolio.controller;

import com.portfolio.model.Blog;
import com.portfolio.repository.BlogRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/blogs")
public class AdminBlogController {
  private final BlogRepository blogRepository;

  public AdminBlogController(BlogRepository blogRepository) {
    this.blogRepository = blogRepository;
  }

  @GetMapping
  public List<Blog> findAll() {
    return blogRepository.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Blog> findById(@PathVariable Long id) {
    return blogRepository.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public Blog create(@Valid @RequestBody Blog blog) {
    blog.setId(null);
    return blogRepository.save(blog);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Blog> update(@PathVariable Long id, @Valid @RequestBody Blog blog) {
    if (!blogRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    blog.setId(id);
    return ResponseEntity.ok(blogRepository.save(blog));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    if (!blogRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    blogRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
