package com.dev.caps.backend.responses

data class AuthResponse(
    val accessToken: String,
    val tokenType: String = "Bearer",
)