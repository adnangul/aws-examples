package com.adnangul.learning.cognito.cognitoSpringAuthTest.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import lombok.extern.slf4j.Slf4j;

/**
 * this class is required only if you want to override default OAuth 2 client integration provided by
 * Spring Boot
 */
@Slf4j
@Configuration
public class OAuthClientConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers(HttpMethod.GET, "/login/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2Login();
    }
}