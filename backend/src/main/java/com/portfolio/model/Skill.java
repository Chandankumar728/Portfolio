package com.portfolio.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Skill {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String name;

  @NotBlank
  private String icon;

  private int percentage;

  private String experience;

  private String category;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getIcon() { return icon; }
  public void setIcon(String icon) { this.icon = icon; }
  public int getPercentage() { return percentage; }
  public void setPercentage(int percentage) { this.percentage = percentage; }
  public String getExperience() { return experience; }
  public void setExperience(String experience) { this.experience = experience; }
  public String getCategory() { return category; }
  public void setCategory(String category) { this.category = category; }
}
