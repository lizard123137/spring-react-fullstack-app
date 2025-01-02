package com.dev.caps.backend.requests

data class LoginRequest(
    val username: String = "",
    val password: String = "",
)
