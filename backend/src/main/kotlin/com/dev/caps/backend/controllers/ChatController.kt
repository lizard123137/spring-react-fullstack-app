package com.dev.caps.backend.controllers

import com.dev.caps.backend.exceptions.InvalidJwtTokenException
import com.dev.caps.backend.models.ChatDto
import com.dev.caps.backend.models.Message
import com.dev.caps.backend.services.ChatService
import com.dev.caps.backend.services.JwtService
import com.dev.caps.backend.services.UserService
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessageHeaderAccessor
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable

@Controller
class ChatController(
    private val simpMessagingTemplate: SimpMessagingTemplate,
    private val jwtService: JwtService,
    private val chatService: ChatService,
    private val userService: UserService,
) {

    @GetMapping("api/chat/{id}")
    fun getChat(@PathVariable id: String): ChatDto {
        return chatService.findById(id)
    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/chat/{chatId}")
    fun sendMessage(
        @DestinationVariable chatId: String,
        message: Message,
        headerAccessor: SimpMessageHeaderAccessor,
    ): Message {
        val username = headerAccessor.sessionAttributes?.get("username") as String?

        message.sender = username ?: "Unknown"
        message.chatId = chatId

        return message
    }
}