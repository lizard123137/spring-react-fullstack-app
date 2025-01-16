package com.dev.caps.backend.models

data class Message(
    var sender: String? = null,
    var chatId: String,

    val content: String,
    val type: MessageType,
)