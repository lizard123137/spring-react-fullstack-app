package com.dev.caps.backend.services

import com.dev.caps.backend.models.User
import com.dev.caps.backend.models.UserDto
import com.dev.caps.backend.models.toDto
import com.dev.caps.backend.repositories.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
) {

    @Transactional(readOnly = true)
    fun findByEmail(email: String): UserDto? {
        return userRepository.findByEmail(email)?.toDto()
    }

    @Transactional(readOnly = true)
    fun findByUsername(username: String): UserDto? {
        return userRepository.findByUsername(username)?.toDto()
    }

    @Transactional(readOnly = true)
    fun existsByEmail(email: String): Boolean {
        return userRepository.existsByEmail(email)
    }

    @Transactional(readOnly = true)
    fun existsByUsername(username: String): Boolean {
        return userRepository.existsByUsername(username)
    }
}