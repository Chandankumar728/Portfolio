package com.portfolio.controller;

import com.portfolio.model.Blog;
import com.portfolio.model.ContactMessage;
import com.portfolio.model.Project;
import com.portfolio.model.ProfileSettings;
import com.portfolio.repository.BlogRepository;
import com.portfolio.repository.CertificationRepository;
import com.portfolio.repository.ContactMessageRepository;
import com.portfolio.repository.ExperienceItemRepository;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.repository.ProfileSettingsRepository;
import com.portfolio.repository.SkillRepository;
import com.portfolio.repository.TestimonialRepository;
import com.portfolio.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
public class PublicController {
  private final ContactMessageRepository contactMessageRepository;
  private final SkillRepository skillRepository;
  private final ProjectRepository projectRepository;
  private final ExperienceItemRepository experienceItemRepository;
  private final BlogRepository blogRepository;
  private final TestimonialRepository testimonialRepository;
  private final ProfileSettingsRepository profileSettingsRepository;
  private final CertificationRepository certificationRepository;
  private final EmailService emailService;

  public PublicController(ContactMessageRepository contactMessageRepository, SkillRepository skillRepository,
                           ProjectRepository projectRepository, ExperienceItemRepository experienceItemRepository,
                           BlogRepository blogRepository, TestimonialRepository testimonialRepository,
                           ProfileSettingsRepository profileSettingsRepository, CertificationRepository certificationRepository,
                           EmailService emailService) {
    this.contactMessageRepository = contactMessageRepository;
    this.skillRepository = skillRepository;
    this.projectRepository = projectRepository;
    this.experienceItemRepository = experienceItemRepository;
    this.blogRepository = blogRepository;
    this.testimonialRepository = testimonialRepository;
    this.profileSettingsRepository = profileSettingsRepository;
    this.certificationRepository = certificationRepository;
    this.emailService = emailService;
  }

  @GetMapping("/portfolio")
  public ResponseEntity<Map<String, Object>> portfolio() {
    ProfileSettings settings = profileSettingsRepository.findById(1L).orElseGet(ProfileSettings::new);
    Map<String, Object> response = new HashMap<>();
    response.put("hero", Map.of(
      "name", safe(settings.getHeroName()),
      "designation", safe(settings.getHeroDesignation()),
      "intro", safe(settings.getHeroIntro()),
      "resumeUrl", safe(settings.getResumeUrl())));
    response.put("about", Map.of(
      "bio", safe(settings.getAboutBio()),
      "experience", safe(settings.getAboutExperience()),
      "projectsCompleted", settings.getAboutProjectsCompleted(),
      "clients", settings.getAboutClients(),
      "image", safe(settings.getAboutImage())));
    response.put("contact", Map.of(
      "email", safe(settings.getEmail()),
      "phone", safe(settings.getPhone()),
      "linkedinUrl", safe(settings.getLinkedinUrl()),
      "githubUrl", safe(settings.getGithubUrl())));
    response.put("education", Map.of(
      "institution", safe(settings.getEducationInstitution()),
      "degree", safe(settings.getEducationDegree()),
      "score", safe(settings.getEducationScore()),
      "duration", safe(settings.getEducationDuration()),
      "location", safe(settings.getEducationLocation())));
    response.put("skills", skillRepository.findAll());
    response.put("experience", experienceItemRepository.findAll());
    response.put("projects", projectRepository.findAll());
    response.put("blogs", blogRepository.findAll());
    response.put("testimonials", testimonialRepository.findAll());
    response.put("certifications", certificationRepository.findAll());
    return ResponseEntity.ok(response);
  }

  @GetMapping("/projects")
  public ResponseEntity<List<Project>> projects() {
    return ResponseEntity.ok(projectRepository.findAll());
  }

  @GetMapping("/blogs")
  public ResponseEntity<List<Blog>> blogs() {
    return ResponseEntity.ok(blogRepository.findAll());
  }

  @PostMapping("/contact")
  public ResponseEntity<ContactMessage> contact(@Valid @RequestBody ContactMessage message) {
    ContactMessage saved = contactMessageRepository.save(message);
    emailService.sendContactNotification(saved);
    return ResponseEntity.ok(saved);
  }

  private String safe(String value) {
    return value == null ? "" : value;
  }
}
