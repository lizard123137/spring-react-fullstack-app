package com.dev.caps.backend.models

data class Message(
    val token: String,
    val content: String,

    val type: MessageType,
    val chatId: String,
)