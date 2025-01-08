package com.dev.caps.backend.controllers

import com.dev.caps.backend.requests.LoginRequest
import com.dev.caps.backend.requests.RegisterRequest
import com.dev.caps.backend.responses.LoginResponse
import com.dev.caps.backend.responses.RegisterResponse
import com.dev.caps.backend.services.AuthService
import org.springframework.web.bind.annotation.*

@RequestMapping("/api/auth")
@RestController
class AuthController(
    private val authService: AuthService,
) {

    @PostMapping("register")
    fun register(@RequestBody request: RegisterRequest): RegisterResponse {
        return authService.register(request)
    }

    @PostMapping("login")
    fun login(@RequestBody request: LoginRequest): LoginResponse {
        return authService.login(request)
    }
}