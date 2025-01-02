package com.dev.caps.backend.services

import com.dev.caps.backend.config.JwtProperties
import com.dev.caps.backend.models.User
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*

@Service
class JwtService(
    jwtProperties: JwtProperties,
) {

    private val secretKey = Keys.hmacShaKeyFor(jwtProperties.key.toByteArray())

    fun generateToken(
        user: User,
        expirationDate: Date,
        additionalClaims: Map<String, String> = emptyMap()
    ): String {
        return Jwts.builder()
            .claims()
            .subject(user.username)
            .issuedAt(Date.from(Instant.now()))
            .expiration(expirationDate)
            .add(additionalClaims)
            .and()
            .signWith(secretKey)
            .compact()
    }

    fun extractUsername(token: String): String? {
        return getAllClaims(token)
            .subject
    }

    fun isExpired(token: String): Boolean {
        return getAllClaims(token)
            .expiration
            .before(Date.from(Instant.now()))
    }

    fun isValid(token: String, user: User): Boolean {
        val username = extractUsername(token)

        return username == user.username && !isExpired(token)
    }

    private fun getAllClaims(token: String): Claims {
        val parser = Jwts.parser()
            .verifyWith(secretKey)
            .build()

        return parser
            .parseSignedClaims(token)
            .payload
    }
}