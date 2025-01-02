package com.dev.caps.backend.controllers

import com.dev.caps.backend.models.User
import com.dev.caps.backend.models.UserDto
import com.dev.caps.backend.models.toDto
import com.dev.caps.backend.requests.LoginRequest
import com.dev.caps.backend.requests.RegisterRequest
import com.dev.caps.backend.services.AuthService
import com.dev.caps.backend.services.JwtService
import com.dev.caps.backend.services.UserService
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RequestMapping("api")
@RestController
class AuthController(
    private val userService: UserService,
    private val authService: AuthService,
    private val jwtService: JwtService,
) {

    @PostMapping("register")
    fun register(@RequestBody request: RegisterRequest): ResponseEntity<UserDto> {
        val user = User()
        user.username = request.username
        user.email = request.email
        user.password = request.password

        return ResponseEntity.ok(userService.save(user).toDto())
    }

    @PostMapping("login")
    fun login(@RequestBody request: LoginRequest, response: HttpServletResponse): ResponseEntity<Any> {
        return ResponseEntity.ok(authService.login(request))
    }

    @GetMapping("user")
    fun user(@CookieValue("jwt") jwt: String?): ResponseEntity<Any> {
        if (jwt == null) {
            return ResponseEntity.status(401).body("Unauthenticated")
        }

        val user = jwtService.extractUsername(jwt)

        return ResponseEntity.ok().body(user)
    }
}