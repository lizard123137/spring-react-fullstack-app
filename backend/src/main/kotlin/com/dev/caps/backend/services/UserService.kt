package com.dev.caps.backend.services

import com.dev.caps.backend.models.Role
import com.dev.caps.backend.models.User
import com.dev.caps.backend.repositories.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

typealias SpringUser = org.springframework.security.core.userdetails.User

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
) {

    fun save(user: User): User {
        user.password = passwordEncoder.encode(user.password)
        return userRepository.save(user)
    }

    fun findByEmail(email: String): User? {
        return userRepository.findByEmail(email)
    }

    fun findByUsername(username: String): User? {
        return userRepository.findByUsername(username)
    }

    fun existsByEmail(email: String): Boolean {
        return userRepository.existsByEmail(email)
    }

    fun existsByUsername(username: String): Boolean {
        return userRepository.existsByUsername(username)
    }

    private fun User.mapToUserDetails(): UserDetails {
        return SpringUser.builder()
            .username(this.username)
            .password(this.password)
            .roles(Role.USER.name)
            .build()
    }
}