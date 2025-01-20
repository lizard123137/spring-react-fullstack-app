package com.dev.caps.backend.controllers

import com.dev.caps.backend.exceptions.EmailTakenException
import com.dev.caps.backend.exceptions.InvalidJwtTokenException
import com.dev.caps.backend.exceptions.UserNotFoundException
import com.dev.caps.backend.exceptions.UsernameTakenException
import com.dev.caps.backend.responses.ExceptionResponse
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
internal class ExceptionControllerAdvice {
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(EmailTakenException::class)
    fun handleEmailTakenException(e: EmailTakenException): ExceptionResponse {
        return ExceptionResponse(
            name = e::class.simpleName.toString(),
            message = e.message.toString(),
        )
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UsernameTakenException::class)
    fun handleUsernameTakenException(e: UsernameTakenException): ExceptionResponse {
        return ExceptionResponse(
            name = e::class.simpleName.toString(),
            message = e.message.toString(),
        )
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UsernameNotFoundException::class)
    fun handleUsernameNotFoundException(e: UsernameNotFoundException): ExceptionResponse {
        return ExceptionResponse(
            name = e::class.simpleName.toString(),
            message = e.message.toString(),
        )
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(AuthenticationCredentialsNotFoundException::class)
    fun handleAuthenticationCredentialsNotFoundException(e: AuthenticationCredentialsNotFoundException): ExceptionResponse {
        return ExceptionResponse(
            name = e::class.simpleName.toString(),
            message = e.message.toString(),
        )
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UserNotFoundException::class)
    fun handleUserNotFoundException(e: UserNotFoundException): ExceptionResponse {
        return ExceptionResponse(
            name = e::class.simpleName.toString(),
            message = e.message.toString(),
        )
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(InvalidJwtTokenException::class)
    fun handleInvalidJwtTokenException(e: InvalidJwtTokenException): ExceptionResponse {
        return ExceptionResponse(
            name = e::class.simpleName.toString(),
            message = e.message.toString(),
        )
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception::class)
    fun handleException(e: Exception): ExceptionResponse {
        return ExceptionResponse(
            name = e::class.simpleName.toString(),
            message = e.message.toString(),
        )
    }
}