package com.portfolio.service;

import com.portfolio.model.ContactMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
  private static final Logger log = LoggerFactory.getLogger(EmailService.class);

  private final JavaMailSender mailSender;
  private final String notifyTo;
  private final String mailUsername;

  public EmailService(JavaMailSender mailSender,
                       @Value("${mail.notify-to}") String notifyTo,
                       @Value("${spring.mail.username}") String mailUsername) {
    this.mailSender = mailSender;
    this.notifyTo = notifyTo;
    this.mailUsername = mailUsername;
  }

  public void sendContactNotification(ContactMessage message) {
    if (mailUsername == null || mailUsername.isBlank()) {
      log.warn("Mail username is not configured; skipping contact notification email.");
      return;
    }

    try {
      SimpleMailMessage mail = new SimpleMailMessage();
      mail.setTo(notifyTo);
      mail.setReplyTo(message.getEmail());
      mail.setSubject("Portfolio contact: " + message.getSubject());
      mail.setText(
        "New message from your portfolio contact form:\n\n"
          + "Name: " + message.getName() + "\n"
          + "Email: " + message.getEmail() + "\n"
          + "Subject: " + message.getSubject() + "\n\n"
          + message.getMessage());
      mailSender.send(mail);
    } catch (Exception ex) {
      log.error("Failed to send contact notification email", ex);
    }
  }
}
