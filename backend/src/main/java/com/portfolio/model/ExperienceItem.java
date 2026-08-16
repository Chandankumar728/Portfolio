package com.portfolio.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "experience_item")
public class ExperienceItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String company;

  private String position;

  private String duration;

  @Column(length = 1000)
  private String description;

  @ElementCollection
  @CollectionTable(name = "experience_technologies", joinColumns = @JoinColumn(name = "experience_id"))
  @Column(name = "technology")
  private List<String> technologies = new ArrayList<>();

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getCompany() { return company; }
  public void setCompany(String company) { this.company = company; }
  public String getPosition() { return position; }
  public void setPosition(String position) { this.position = position; }
  public String getDuration() { return duration; }
  public void setDuration(String duration) { this.duration = duration; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public List<String> getTechnologies() { return technologies; }
  public void setTechnologies(List<String> technologies) { this.technologies = technologies; }
}
