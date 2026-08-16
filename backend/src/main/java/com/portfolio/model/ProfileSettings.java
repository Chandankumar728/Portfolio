package com.portfolio.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ProfileSettings {
  @Id
  private Long id;

  private String heroName;

  private String heroDesignation;

  @Column(length = 1000)
  private String heroIntro;

  private String resumeUrl;

  @Column(length = 2000)
  private String aboutBio;

  private String aboutExperience;

  private int aboutProjectsCompleted;

  private int aboutClients;

  private String aboutImage;

  private String email;

  private String phone;

  private String linkedinUrl;

  private String githubUrl;

  private String educationInstitution;

  private String educationDegree;

  private String educationScore;

  private String educationDuration;

  private String educationLocation;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getHeroName() { return heroName; }
  public void setHeroName(String heroName) { this.heroName = heroName; }
  public String getHeroDesignation() { return heroDesignation; }
  public void setHeroDesignation(String heroDesignation) { this.heroDesignation = heroDesignation; }
  public String getHeroIntro() { return heroIntro; }
  public void setHeroIntro(String heroIntro) { this.heroIntro = heroIntro; }
  public String getResumeUrl() { return resumeUrl; }
  public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }
  public String getAboutBio() { return aboutBio; }
  public void setAboutBio(String aboutBio) { this.aboutBio = aboutBio; }
  public String getAboutExperience() { return aboutExperience; }
  public void setAboutExperience(String aboutExperience) { this.aboutExperience = aboutExperience; }
  public int getAboutProjectsCompleted() { return aboutProjectsCompleted; }
  public void setAboutProjectsCompleted(int aboutProjectsCompleted) { this.aboutProjectsCompleted = aboutProjectsCompleted; }
  public int getAboutClients() { return aboutClients; }
  public void setAboutClients(int aboutClients) { this.aboutClients = aboutClients; }
  public String getAboutImage() { return aboutImage; }
  public void setAboutImage(String aboutImage) { this.aboutImage = aboutImage; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getPhone() { return phone; }
  public void setPhone(String phone) { this.phone = phone; }
  public String getLinkedinUrl() { return linkedinUrl; }
  public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }
  public String getGithubUrl() { return githubUrl; }
  public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
  public String getEducationInstitution() { return educationInstitution; }
  public void setEducationInstitution(String educationInstitution) { this.educationInstitution = educationInstitution; }
  public String getEducationDegree() { return educationDegree; }
  public void setEducationDegree(String educationDegree) { this.educationDegree = educationDegree; }
  public String getEducationScore() { return educationScore; }
  public void setEducationScore(String educationScore) { this.educationScore = educationScore; }
  public String getEducationDuration() { return educationDuration; }
  public void setEducationDuration(String educationDuration) { this.educationDuration = educationDuration; }
  public String getEducationLocation() { return educationLocation; }
  public void setEducationLocation(String educationLocation) { this.educationLocation = educationLocation; }
}
