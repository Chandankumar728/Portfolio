package com.portfolio.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Project {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String title;

  private String category;

  @Column(length = 1000)
  private String description;

  private String image;

  private String github;

  private String demo;

  @ElementCollection
  @CollectionTable(name = "project_tech_stack", joinColumns = @JoinColumn(name = "project_id"))
  @Column(name = "technology")
  private List<String> techStack = new ArrayList<>();

  private String status;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getCategory() { return category; }
  public void setCategory(String category) { this.category = category; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public String getImage() { return image; }
  public void setImage(String image) { this.image = image; }
  public String getGithub() { return github; }
  public void setGithub(String github) { this.github = github; }
  public String getDemo() { return demo; }
  public void setDemo(String demo) { this.demo = demo; }
  public List<String> getTechStack() { return techStack; }
  public void setTechStack(List<String> techStack) { this.techStack = techStack; }
  public String getStatus() { return status; }
  public void setStatus(String status) { this.status = status; }
}
