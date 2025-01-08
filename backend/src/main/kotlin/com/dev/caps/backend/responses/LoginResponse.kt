package com.dev.caps.backend.responses

import com.dev.caps.backend.models.UserDto

data class LoginResponse(
    val user: UserDto,
    val token: String,
    val refreshToken: String,
)