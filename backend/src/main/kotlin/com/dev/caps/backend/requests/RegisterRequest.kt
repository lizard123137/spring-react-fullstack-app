package com.dev.caps.backend.requests

data class RegisterRequest(
    val username: String = "",
    val email: String = "",
    val password: String = ""
)