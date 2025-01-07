package com.dev.caps.backend.repositories

import com.dev.caps.backend.models.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface UserRepository: JpaRepository<User, UUID> {
    fun findByEmail(email: String): User?
    fun findByUsername(username: String): User?

    fun existsByUsername(username: String): Boolean
    fun existsByEmail(email: String): Boolean
}