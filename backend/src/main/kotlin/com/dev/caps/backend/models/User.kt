package com.dev.caps.backend.models

import jakarta.persistence.*

@Entity
@Table(name = "users")
class User(
    @Column(unique = true, nullable = false)
    var username: String,

    @Column(unique = true, nullable = false)
    var email: String,

    @Column
    var password: String,

    @Column
    var roles: String = Role.USER.name, // TODO maybe create a separate roles table

    @Id
    @GeneratedValue
    var id: Long? = null,
)

data class UserDto(
    val username: String,
    val email: String,
    val roles: Set<Role>,
)

fun User.toUserDto() = UserDto(
    username = username,
    email = email,
    roles = roles.split(",").map { Role.valueOf(it.trim()) }.toSet()
)