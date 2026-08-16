package com.portfolio.config;

import com.portfolio.model.Certification;
import com.portfolio.model.ExperienceItem;
import com.portfolio.model.Project;
import com.portfolio.model.ProfileSettings;
import com.portfolio.model.Skill;
import com.portfolio.model.User;
import com.portfolio.repository.CertificationRepository;
import com.portfolio.repository.ExperienceItemRepository;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.repository.ProfileSettingsRepository;
import com.portfolio.repository.SkillRepository;
import com.portfolio.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {
  private final SkillRepository skillRepository;
  private final ProjectRepository projectRepository;
  private final ExperienceItemRepository experienceItemRepository;
  private final ProfileSettingsRepository profileSettingsRepository;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final CertificationRepository certificationRepository;

  public DataSeeder(SkillRepository skillRepository, ProjectRepository projectRepository,
                     ExperienceItemRepository experienceItemRepository, ProfileSettingsRepository profileSettingsRepository,
                     UserRepository userRepository, PasswordEncoder passwordEncoder, CertificationRepository certificationRepository) {
    this.skillRepository = skillRepository;
    this.projectRepository = projectRepository;
    this.experienceItemRepository = experienceItemRepository;
    this.profileSettingsRepository = profileSettingsRepository;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.certificationRepository = certificationRepository;
  }

  @Override
  public void run(String... args) {
    seedAdminUser();
    seedSettings();
    seedSkills();
    seedExperience();
    seedProjects();
    seedCertifications();
  }

  private void seedAdminUser() {
    if (userRepository.count() > 0) {
      return;
    }
    User admin = new User();
    admin.setUsername("admin");
    admin.setPassword(passwordEncoder.encode("admin"));
    admin.setRole("ADMIN");
    userRepository.save(admin);
  }

  private void seedSettings() {
    if (profileSettingsRepository.count() > 0) {
      return;
    }
    ProfileSettings settings = new ProfileSettings();
    settings.setId(1L);
    settings.setHeroName("Chandan Kumar");
    settings.setHeroDesignation("Software Engineer — Full Stack & AI Systems");
    settings.setHeroIntro("Software Engineer specializing in React, Angular, Node.js, and Spring Boot, with hands-on experience building AI-integrated systems — conversational agents, real-time voice calling, and multi-agent coordination powered by Google Gemini.");
    settings.setResumeUrl("/assets/resume.pdf");
    settings.setAboutBio("I'm a full-stack and frontend engineer who has delivered enterprise and government-scale web applications, and more recently, AI-powered products: conversational ordering assistants, real-time voice agents, and multi-agent systems built on Google Gemini. I care about reliability, clean architecture, and shipping software that holds up under real usage.");
    settings.setAboutExperience("3+ Years");
    settings.setAboutProjectsCompleted(7);
    settings.setAboutClients(5);
    settings.setAboutImage("");
    settings.setEmail("chandankumar6299068@gmail.com");
    settings.setPhone("+91 6299068110");
    settings.setLinkedinUrl("https://www.linkedin.com/in/chandan-kumar-0623b81aa/");
    settings.setGithubUrl("https://github.com/Chandankumar728");
    settings.setEducationInstitution("AMITY University");
    settings.setEducationDegree("B.Tech — Computer Science and Engineering");
    settings.setEducationScore("CGPA: 8.6");
    settings.setEducationDuration("2019 - 2023");
    settings.setEducationLocation("Ranchi, Jharkhand");
    profileSettingsRepository.save(settings);
  }

  private void seedSkills() {
    if (skillRepository.count() > 0) {
      return;
    }
    skillRepository.saveAll(List.of(
      skill("React.js", "fa-brands fa-react", 90, "3+ years", "Frontend"),
      skill("Angular", "fa-brands fa-angular", 88, "2+ years", "Frontend"),
      skill("TypeScript", "fa-solid fa-code", 85, "3+ years", "Frontend"),
      skill("Node.js", "fa-brands fa-node-js", 85, "3+ years", "Backend"),
      skill("Spring Boot", "fa-solid fa-leaf", 82, "1+ years", "Backend"),
      skill("MongoDB", "fa-solid fa-database", 80, "3+ years", "Database"),
      skill("Google Gemini / GenAI", "fa-solid fa-robot", 85, "1+ years", "AI"),
      skill("Tailwind CSS", "fa-brands fa-css3-alt", 88, "3+ years", "Frontend")
    ));
  }

  private Skill skill(String name, String icon, int percentage, String experience, String category) {
    Skill entity = new Skill();
    entity.setName(name);
    entity.setIcon(icon);
    entity.setPercentage(percentage);
    entity.setExperience(experience);
    entity.setCategory(category);
    return entity;
  }

  private void seedExperience() {
    if (experienceItemRepository.count() > 0) {
      return;
    }
    ExperienceItem e1 = new ExperienceItem();
    e1.setCompany("Wiz Digital Services Pvt. Ltd.");
    e1.setPosition("Software Engineer");
    e1.setDuration("Dec 2025 - Present");
    e1.setDescription("Building AI-integrated full-stack products: Annapau, an AI-powered ordering & catalog management system with a multi-agent WhatsApp ordering assistant and voice support, and Culmia/RealtyCloser, an AI voice calling platform for real estate using Google Gemini Live, Twilio, and Stripe.");
    e1.setTechnologies(List.of("Angular", "Spring Boot", "Node.js", "Google Gemini", "Twilio", "Stripe", "Docker"));

    ExperienceItem e2 = new ExperienceItem();
    e2.setCompany("Aadrika Enterprises Pvt. Ltd.");
    e2.setPosition("Software Developer");
    e2.setDuration("Apr 2023 - Nov 2025");
    e2.setDescription("Delivered enterprise and government web applications, including water user charges & hoarding management for Akola Municipal Corporation, and fines collection, ad management, and pet registration systems for JUIDCO Jharkhand.");
    e2.setTechnologies(List.of("React.js", "Tailwind CSS", "Node.js", "MongoDB", "Formik"));

    experienceItemRepository.saveAll(List.of(e1, e2));
  }

  private void seedProjects() {
    if (projectRepository.count() > 0) {
      return;
    }
    Project p1 = new Project();
    p1.setTitle("Annapau — AI-Powered Ordering & Catalog Management");
    p1.setCategory("AI / Full Stack");
    p1.setDescription("Full-stack system for managing product catalogs, customer orders, and pricing, used by multiple businesses independently. Includes a multi-agent AI chat assistant that takes WhatsApp orders with voice support (speech-to-text and text-to-speech).");
    p1.setTechStack(List.of("Angular", "Spring Boot", "Node.js", "Google Gemini"));
    p1.setStatus("Production");

    Project p2 = new Project();
    p2.setTitle("Culmia / RealtyCloser — AI Voice Calling Sales Agent");
    p2.setCategory("AI / Voice");
    p2.setDescription("Inbound/outbound AI voice calling agent for real estate using Google ADK and Gemini Live over WebSocket, integrated with Google Calendar and Stripe to book property viewings and generate payment links mid-conversation.");
    p2.setTechStack(List.of("Angular", "Spring Boot", "Google Gemini Live", "Twilio", "Stripe"));
    p2.setStatus("Production");

    Project p3 = new Project();
    p3.setTitle("Firepad");
    p3.setCategory("Full Stack");
    p3.setDescription("Collaborative platform for real-time data sharing and editing, similar to shared live documents, supporting simultaneous multi-user editing.");
    p3.setDemo("https://firepad-aadrika-dybz4ou2v-chandankumar728s-projects.vercel.app");
    p3.setTechStack(List.of("React.js", "Node.js", "Tailwind CSS"));
    p3.setStatus("Live");

    Project p4 = new Project();
    p4.setTitle("RO Service Ranchi");
    p4.setCategory("Full Stack");
    p4.setDescription("Service booking platform for RO (water purifier) installation and repair requests, with real-time form handling and request tracking.");
    p4.setDemo("https://roserviceranchi.com");
    p4.setTechStack(List.of("React.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"));
    p4.setStatus("Live");

    Project p5 = new Project();
    p5.setTitle("Portfolio Website (Previous)");
    p5.setCategory("Frontend");
    p5.setDescription("Personal portfolio site showcasing skills, projects, and experience, optimized for fast load times and full mobile responsiveness.");
    p5.setDemo("https://chandankumar728.github.io/MyPortfolio");
    p5.setTechStack(List.of("React.js", "Tailwind CSS"));
    p5.setStatus("Live");

    projectRepository.saveAll(List.of(p1, p2, p3, p4, p5));
  }

  private void seedCertifications() {
    if (certificationRepository.count() > 0) {
      return;
    }
    Certification c1 = new Certification();
    c1.setName("IBM i (AS/400) Fundamentals");
    c1.setIssuer("IBM");
    c1.setYear("2026");

    Certification c2 = new Certification();
    c2.setName("Web Development");
    c2.setIssuer("Let's Grow More");
    c2.setDescription("Created a single-page website using HTML, CSS, and JavaScript, and built a web application using React.");

    certificationRepository.saveAll(List.of(c1, c2));
  }
}
