package com.dev.caps.backend.services

import com.dev.caps.backend.exceptions.EmailTakenException
import com.dev.caps.backend.exceptions.UsernameTakenException
import com.dev.caps.backend.models.User
import com.dev.caps.backend.models.toUserDto
import com.dev.caps.backend.repositories.UserRepository
import com.dev.caps.backend.requests.LoginRequest
import com.dev.caps.backend.requests.RegisterRequest
import com.dev.caps.backend.responses.LoginResponse
import com.dev.caps.backend.responses.RegisterResponse
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val authenticationManager: AuthenticationManager,
    private val jwtService: JwtService,
    private val passwordEncoder: PasswordEncoder,
) {
    fun register(request: RegisterRequest): RegisterResponse {
        if (userRepository.existsByEmail(request.email)) throw EmailTakenException(request.email)
        if (userRepository.existsByUsername(request.username)) throw UsernameTakenException(request.username)

        val user = User(
            username = request.username,
            email = request.email,
            password = passwordEncoder.encode(request.password),
        )

        userRepository.save(user)

        val auth = authenticationManager.authenticate(UsernamePasswordAuthenticationToken(request.username, request.password))
        SecurityContextHolder.getContext().authentication = auth

        return RegisterResponse(
            user = user.toUserDto(),
            token = jwtService.generateToken(auth),
            refreshToken = jwtService.generateRefreshToken(auth)
        )
    }

    fun login(request: LoginRequest): LoginResponse {
        val user = userRepository.findByUsername(request.username)
            ?: throw UsernameNotFoundException("User with username ${request.username} not found");

        val auth = authenticationManager.authenticate(UsernamePasswordAuthenticationToken(request.username, request.password))
        SecurityContextHolder.getContext().authentication = auth

        val token = jwtService.generateToken(auth)
        val refreshToken = jwtService.generateRefreshToken(auth)

        return LoginResponse(
            user = user.toUserDto(),
            token = token,
            refreshToken = refreshToken,
        )
    }
}