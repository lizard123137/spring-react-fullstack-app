package com.dev.caps.backend.config

import com.dev.caps.backend.filters.JwtAuthFilter
import com.dev.caps.backend.services.AppUserDetailsService
import com.dev.caps.backend.services.JwtService
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.SecurityConfigurerAdapter
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.DefaultSecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableConfigurationProperties(JwtProperties::class)
class JwtConfig(
    private val appUserDetailsService: AppUserDetailsService,
    private val jwtService: JwtService,
): SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity>() {

    override fun configure(http: HttpSecurity) {
        val jwtFilter = JwtAuthFilter(appUserDetailsService, jwtService)
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter::class.java)
    }
}