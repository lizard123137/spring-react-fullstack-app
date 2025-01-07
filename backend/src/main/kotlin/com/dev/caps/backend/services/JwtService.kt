package com.dev.caps.backend.services

import com.dev.caps.backend.config.security.JwtProperties
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Service
import java.util.*
import javax.crypto.spec.SecretKeySpec

@Service
class JwtService(
    private val jwtProperties: JwtProperties,
) {

    private val key = SecretKeySpec(jwtProperties.key.toByteArray(Charsets.UTF_8), "HmacSHA512")

    fun generateToken(authentication: Authentication): String {
        val username = authentication.name

        val currentDate = Date()
        val expirationDate = Date(currentDate.time + jwtProperties.accessTokenExpiration)

        // TODO fix deprecated
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(currentDate)
            .setExpiration(expirationDate)
            .signWith(key)
            .compact()
    }

    fun getUsernameFromToken(token: String): String? {
        return Jwts.parser()
            .setSigningKey(jwtProperties.key.toByteArray(Charsets.UTF_8))
            .build()
            .parseClaimsJwt(token)
            .body
            .subject
    }

    fun validateToken(authToken: String): Boolean {
        try {
            Jwts.parser()
                .setSigningKey(jwtProperties.key.toByteArray(Charsets.UTF_8))
                .build()
                .parseClaimsJws(authToken)
            return true
        } catch (e: Exception) {
            throw AuthenticationCredentialsNotFoundException("JWT token is invalid or expired")
        }
    }
}