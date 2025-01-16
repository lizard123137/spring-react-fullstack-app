package com.dev.caps.backend.controllers

import com.dev.caps.backend.requests.LoginRequest
import com.dev.caps.backend.requests.RegisterRequest
import com.dev.caps.backend.responses.AuthResponse
import com.dev.caps.backend.responses.LoginResponse
import com.dev.caps.backend.responses.RegisterResponse
import com.dev.caps.backend.services.AuthService
import org.springframework.web.bind.annotation.*

@RequestMapping("/api")
@RestController
class AuthController(
    private val authService: AuthService,
) {

    @PostMapping("/auth/register")
    fun register(@RequestBody request: RegisterRequest): RegisterResponse {
        return authService.register(request)
    }

    @PostMapping("/auth/login")
    fun login(@RequestBody request: LoginRequest): LoginResponse {
        return authService.login(request)
    }

    @PostMapping("/auth/refresh")
    fun refreshToken(@RequestBody refreshToken: String): AuthResponse {
        return authService.refresh(refreshToken)
    }
}