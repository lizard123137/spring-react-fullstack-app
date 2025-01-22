package com.dev.caps.backend.models

import jakarta.persistence.*

@Entity
@Table(name = "users")
class User(
    @Id
    @Column(unique = true, nullable = false)
    var username: String,

    @Column(unique = true, nullable = false)
    var email: String,

    @Column
    var password: String,

    @Column
    var description: String = "",

    @Column
    var avatar: String = "",

    @Column
    var roles: String = Role.USER.name, // TODO maybe create a separate roles table

    @ManyToMany
    @JoinTable(
        name = "user_chats",
        joinColumns = [JoinColumn(name = "user_username", referencedColumnName = "username")],
        inverseJoinColumns = [JoinColumn(name = "chat_id", referencedColumnName = "id")]
    )
    var chats: Set<Chat> = mutableSetOf(),
)

data class UserDto(
    val username: String,
    val email: String,
    val description: String,
    val avatar: String,
    val roles: Set<Role>,
    val chats: Set<String>,
)

fun User.toDto() = UserDto(
    username = username,
    email = email,
    description = description,
    avatar = avatar,
    roles = roles.split(",").map { Role.valueOf(it.trim()) }.toSet(),
    chats = chats.map { it.id }.toSet(),
)