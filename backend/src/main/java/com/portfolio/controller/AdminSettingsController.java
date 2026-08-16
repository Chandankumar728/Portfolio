package com.portfolio.controller;

import com.portfolio.model.ProfileSettings;
import com.portfolio.repository.ProfileSettingsRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/settings")
public class AdminSettingsController {
  private final ProfileSettingsRepository profileSettingsRepository;

  public AdminSettingsController(ProfileSettingsRepository profileSettingsRepository) {
    this.profileSettingsRepository = profileSettingsRepository;
  }

  @GetMapping
  public ProfileSettings get() {
    return profileSettingsRepository.findById(1L).orElseGet(ProfileSettings::new);
  }

  @PutMapping
  public ProfileSettings update(@RequestBody ProfileSettings settings) {
    settings.setId(1L);
    return profileSettingsRepository.save(settings);
  }
}
