package com.dev.caps.backend.services

import com.dev.caps.backend.models.Chat
import com.dev.caps.backend.models.ChatDto
import com.dev.caps.backend.models.toChatDto
import com.dev.caps.backend.repositories.ChatRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class ChatService(
    private val chatRepository: ChatRepository,
) {

    @Transactional
    fun save(chat: Chat): ChatDto {
        return chatRepository.save(chat).toChatDto()
    }

    @Transactional(readOnly = true)
    fun findById(id: String): ChatDto? {
        return chatRepository.findById(id).orElse(null)?.toChatDto()
    }
}