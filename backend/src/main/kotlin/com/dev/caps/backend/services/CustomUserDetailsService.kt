package com.dev.caps.backend.services

import com.dev.caps.backend.models.Role
import com.dev.caps.backend.repositories.UserRepository
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class CustomUserDetailsService(
    private val userRepository: UserRepository,
): UserDetailsService {
    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User $username not found")
        return User(user.username, user.password, mapRolesToAuthorities(user.roles))
    }

    private fun mapRolesToAuthorities(roles: Set<Role>): Collection<GrantedAuthority> {
        return roles.map { role -> SimpleGrantedAuthority(role.name) }
    }
}