package com.dev.caps.backend.models

data class Message(
    val sender: User,
    val content: String,
)