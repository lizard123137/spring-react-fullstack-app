package com.dev.caps.backend.filters

import com.dev.caps.backend.services.JwtService
import com.dev.caps.backend.services.UserDetailsService
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.security.web.util.matcher.AntPathRequestMatcher
import org.springframework.web.filter.OncePerRequestFilter

class AuthFilter(
    private val jwtService: JwtService,
    private val userDetailsService: UserDetailsService,
): OncePerRequestFilter() {

    private val log = LoggerFactory.getLogger(AuthFilter::class.java)

    private val ignoredPaths = AntPathRequestMatcher("/api/auth/**")

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        if (this.ignoredPaths.matches(request)) {
            filterChain.doFilter(request, response)
            return
        }

        val token = getJwtFromRequest(request)
        if (token == null) {
            filterChain.doFilter(request, response)
            return;
        }

        try {
            if (jwtService.validateToken(token)) {
                val username = jwtService.getUsernameFromToken(token)
                    ?: throw UsernameNotFoundException("Username not found")
                val user = userDetailsService.loadUserByUsername(username)

                val authentication = UsernamePasswordAuthenticationToken(user, null, user.authorities)
                authentication.details = WebAuthenticationDetailsSource().buildDetails(request)
                SecurityContextHolder.getContext().authentication = authentication
            }
        } catch (e: AuthenticationCredentialsNotFoundException) {
            response.status = HttpServletResponse.SC_UNAUTHORIZED
            response.writer.write("JWT token is invalid or expired")
            return
        } catch (e: Exception) {
            log.error(e.message, e)
        }

        filterChain.doFilter(request, response)
    }

    private fun getJwtFromRequest(request: HttpServletRequest): String? {
        val bearerToken = request.getHeader("Authorization")

        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7)
        }

        return null
    }
}