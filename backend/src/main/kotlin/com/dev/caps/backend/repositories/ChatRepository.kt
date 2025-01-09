package com.dev.caps.backend.repositories

import com.dev.caps.backend.models.Chat
import org.springframework.data.jpa.repository.JpaRepository

interface ChatRepository: JpaRepository<Chat, String>