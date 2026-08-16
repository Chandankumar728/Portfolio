package com.portfolio.controller;

import com.portfolio.model.User;
import com.portfolio.repository.UserRepository;
import com.portfolio.security.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final JwtService jwtService;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public AuthController(JwtService jwtService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.jwtService = jwtService;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @PostMapping("/login")
  public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> payload) {
    String username = payload.getOrDefault("username", "");
    String password = payload.getOrDefault("password", "");

    Optional<User> userOpt = userRepository.findByUsername(username);
    if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())) {
      return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }

    User user = userOpt.get();
    String token = jwtService.generateToken(user.getUsername(), List.of(user.getRole()));
    return ResponseEntity.ok(Map.of("token", token, "username", user.getUsername(), "roles", List.of(user.getRole())));
  }
}
