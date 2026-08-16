package com.portfolio.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Testimonial {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String name;

  private String company;

  @Column(length = 1000)
  private String review;

  private int rating;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getCompany() { return company; }
  public void setCompany(String company) { this.company = company; }
  public String getReview() { return review; }
  public void setReview(String review) { this.review = review; }
  public int getRating() { return rating; }
  public void setRating(int rating) { this.rating = rating; }
}
