package com.dev.caps.backend.filters

import com.dev.caps.backend.services.JwtService
import org.slf4j.LoggerFactory
import org.springframework.http.HttpHeaders
import org.springframework.http.server.ServerHttpRequest
import org.springframework.http.server.ServerHttpResponse
import org.springframework.http.server.ServletServerHttpRequest
import org.springframework.stereotype.Component
import org.springframework.web.socket.WebSocketHandler
import org.springframework.web.socket.server.HandshakeInterceptor
import java.lang.Exception

@Component
class JwtHandshakeInterceptor(
    private val jwtService: JwtService,
): HandshakeInterceptor {

    private val log = LoggerFactory.getLogger(JwtHandshakeInterceptor::class.java)

    override fun beforeHandshake(
        request: ServerHttpRequest,
        response: ServerHttpResponse,
        wsHandler: WebSocketHandler,
        attributes: MutableMap<String, Any>
    ): Boolean {
        if (request is ServletServerHttpRequest) {
            val servletRequest = request.servletRequest
            val token = servletRequest
                .getHeader(HttpHeaders.AUTHORIZATION)
                .removePrefix("Bearer ")

            if (token.isNotEmpty()) {
                val username = jwtService.getUsernameFromToken(token)
                if (username != null) {
                    attributes["username"] = username
                    return true
                } else {
                    log.error("Username not found")
                }
            } else {
                log.error("Token is empty")
            }
        }

        return false
    }

    override fun afterHandshake(
        request: ServerHttpRequest,
        response: ServerHttpResponse,
        wsHandler: WebSocketHandler,
        exception: Exception?
    ) {
        // Do nothing
    }
}