package com.dev.caps.backend.controllers

import com.dev.caps.backend.models.Role
import com.dev.caps.backend.models.User
import com.dev.caps.backend.models.UserDto
import com.dev.caps.backend.models.toDto
import com.dev.caps.backend.requests.LoginRequest
import com.dev.caps.backend.requests.RegisterRequest
import com.dev.caps.backend.responses.AuthResponse
import com.dev.caps.backend.services.JwtService
import com.dev.caps.backend.services.UserService
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*

@RequestMapping("/api/auth")
@RestController
class AuthController(
    private val userService: UserService,
    private val authenticationManager: AuthenticationManager,
    private val jwtService: JwtService,
) {

    @PostMapping("register")
    fun register(@RequestBody request: RegisterRequest): ResponseEntity<String> {
        if (userService.existsByEmail(request.email))
            return ResponseEntity("Email is taken", HttpStatus.BAD_REQUEST)

        if (userService.existsByUsername(request.username))
            return ResponseEntity("Username is taken", HttpStatus.BAD_REQUEST)

        val user = User()
        user.username = request.username
        user.email = request.email
        user.password = request.password
        user.roles = setOf(Role.USER)

        userService.save(user)
        return ResponseEntity("User created", HttpStatus.CREATED)
    }

    @PostMapping("login")
    fun login(@RequestBody request: LoginRequest, response: HttpServletResponse): ResponseEntity<AuthResponse> {
        val auth = authenticationManager.authenticate(UsernamePasswordAuthenticationToken(request.username, request.password))
        SecurityContextHolder.getContext().authentication = auth
        return ResponseEntity(AuthResponse(jwtService.generateToken(auth)), HttpStatus.OK)
    }
}