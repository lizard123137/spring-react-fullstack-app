package com.dev.caps.backend.services

import com.dev.caps.backend.repositories.UserRepository
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserDetailsService(
    private val userRepository: UserRepository,
): UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User $username not found")
        return org.springframework.security.core.userdetails.User(
            user.username,
            user.password,
            mapRolesToAuthorities(user.roles)
        )
    }

    private fun mapRolesToAuthorities(roles: String): Collection<GrantedAuthority> {
        return roles.split(",").map { role -> SimpleGrantedAuthority(role.trim()) }
    }
}