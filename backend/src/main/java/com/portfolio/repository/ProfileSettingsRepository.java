package com.portfolio.repository;

import com.portfolio.model.ProfileSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileSettingsRepository extends JpaRepository<ProfileSettings, Long> {
}
