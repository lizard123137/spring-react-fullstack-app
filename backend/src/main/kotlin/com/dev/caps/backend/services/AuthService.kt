package com.dev.caps.backend.services

import com.dev.caps.backend.config.JwtProperties
import com.dev.caps.backend.requests.LoginRequest
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import java.util.*

@Service
class AuthService(
    private val authenticationManager: AuthenticationManager,
    private val userService: UserService,
    private val jwtService: JwtService,
    private val jwtProperties: JwtProperties,
) {

    fun login(request: LoginRequest): String {
        authenticationManager.authenticate(UsernamePasswordAuthenticationToken(request.username, request.password))

        val user = userService.findByUsername(request.username)
            ?: throw UsernameNotFoundException("User not found")
        val accessToken = jwtService.generateToken(
            user = user,
            expirationDate = Date(System.currentTimeMillis() + jwtProperties.accessTokenExpiration)
        )

        return accessToken
    }
}