package com.dev.caps.backend.controllers

import com.dev.caps.backend.exceptions.UserNotFoundException
import com.dev.caps.backend.models.UserDto
import com.dev.caps.backend.services.UserService
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping

@Controller
@RequestMapping("/api")
class UserController(private val userService: UserService) {
    @GetMapping("/user/{id}")
    fun getUser(@PathVariable id: String): ResponseEntity<UserDto> {
        val user = userService.findById(id.toLong())
            ?: throw UserNotFoundException(id)

        return ResponseEntity.ok(user)
    }
}