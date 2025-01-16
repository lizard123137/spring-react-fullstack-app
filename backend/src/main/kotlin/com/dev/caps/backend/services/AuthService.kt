package com.dev.caps.backend.services

import com.dev.caps.backend.exceptions.EmailTakenException
import com.dev.caps.backend.exceptions.InvalidJwtTokenException
import com.dev.caps.backend.exceptions.UserNotFoundException
import com.dev.caps.backend.exceptions.UsernameTakenException
import com.dev.caps.backend.models.User
import com.dev.caps.backend.models.toUserDto
import com.dev.caps.backend.repositories.UserRepository
import com.dev.caps.backend.requests.LoginRequest
import com.dev.caps.backend.requests.RegisterRequest
import com.dev.caps.backend.responses.AuthResponse
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
            token = jwtService.generateToken(request.username),
            refreshToken = jwtService.generateRefreshToken(request.username)
        )
    }

    fun login(request: LoginRequest): LoginResponse {
        val user = userRepository.findByUsername(request.username)
            ?: throw UsernameNotFoundException("User with username ${request.username} not found");

        val auth = authenticationManager.authenticate(UsernamePasswordAuthenticationToken(request.username, request.password))
        SecurityContextHolder.getContext().authentication = auth

        val token = jwtService.generateToken(request.username)
        val refreshToken = jwtService.generateRefreshToken(request.username)

        return LoginResponse(
            user = user.toUserDto(),
            token = token,
            refreshToken = refreshToken,
        )
    }

    fun refresh(refreshToken: String): AuthResponse {
        if (!jwtService.validateToken(refreshToken))
            throw InvalidJwtTokenException(refreshToken)

        val username = jwtService.getUsernameFromToken(refreshToken)
            ?: throw InvalidJwtTokenException(refreshToken)
        if (!userRepository.existsByUsername(username))
            throw UserNotFoundException(username)

        return AuthResponse(
            accessToken = jwtService.generateToken(username),
            refreshToken = jwtService.generateRefreshToken(username)
        )
    }
}