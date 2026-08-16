package com.portfolio.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

@Entity
public class Blog {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String title;

  @Column(length = 1000)
  private String excerpt;

  private String category;

  @NotBlank
  private String slug;

  private LocalDate publishedAt;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getExcerpt() { return excerpt; }
  public void setExcerpt(String excerpt) { this.excerpt = excerpt; }
  public String getCategory() { return category; }
  public void setCategory(String category) { this.category = category; }
  public String getSlug() { return slug; }
  public void setSlug(String slug) { this.slug = slug; }
  public LocalDate getPublishedAt() { return publishedAt; }
  public void setPublishedAt(LocalDate publishedAt) { this.publishedAt = publishedAt; }
}
