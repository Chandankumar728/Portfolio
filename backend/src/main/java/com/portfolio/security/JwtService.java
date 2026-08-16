package com.portfolio.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;

@Component
public class JwtService {
  private static final long EXPIRATION_MS = 24 * 60 * 60 * 1000;

  private final SecretKey key;

  public JwtService(@Value("${jwt.secret}") String secret) {
    this.key = Keys.hmacShaKeyFor(sha256(secret));
  }

  public String generateToken(String username, List<String> roles) {
    Date now = new Date();
    return Jwts.builder()
      .subject(username)
      .claim("roles", roles)
      .issuedAt(now)
      .expiration(new Date(now.getTime() + EXPIRATION_MS))
      .signWith(key)
      .compact();
  }

  public Claims parseToken(String token) {
    return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
  }

  private static byte[] sha256(String value) {
    try {
      return MessageDigest.getInstance("SHA-256").digest(value.getBytes(StandardCharsets.UTF_8));
    } catch (NoSuchAlgorithmException e) {
      throw new IllegalStateException(e);
    }
  }
}
