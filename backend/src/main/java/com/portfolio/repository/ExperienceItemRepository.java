package com.portfolio.repository;

import com.portfolio.model.ExperienceItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceItemRepository extends JpaRepository<ExperienceItem, Long> {
}
