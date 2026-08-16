package com.portfolio.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  private final JwtService jwtService;

  public JwtAuthenticationFilter(JwtService jwtService) {
    this.jwtService = jwtService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    String header = request.getHeader("Authorization");
    if (header != null && header.startsWith("Bearer ")) {
      try {
        Claims claims = jwtService.parseToken(header.substring(7));
        List<?> roles = claims.get("roles", List.class);
        List<GrantedAuthority> authorities = roles == null
          ? List.of()
          : roles.stream()
              .map(role -> {
                String r = role.toString();
                return new SimpleGrantedAuthority(r.startsWith("ROLE_") ? r : "ROLE_" + r);
              })
              .map(GrantedAuthority.class::cast).toList();
        SecurityContextHolder.getContext().setAuthentication(
          new UsernamePasswordAuthenticationToken(claims.getSubject(), null, authorities));
      } catch (Exception ex) {
        SecurityContextHolder.clearContext();
      }
    }
    filterChain.doFilter(request, response);
  }
}
