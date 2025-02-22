package com.dev.caps.backend.models

import jakarta.persistence.*

@Entity
@Table(name = "chats")
class Chat(
    @Id
    var id: String,

    @ManyToOne
    @JoinColumn(name = "admin_username", nullable = false)
    var admin: User,

    @ManyToMany
    var users: MutableSet<User> = mutableSetOf(),
)

data class ChatDto(
    var id: String,
    var admin: UserDto,
    var users: MutableSet<UserDto> = mutableSetOf(),
)

fun Chat.toDto() = ChatDto(
    id = id,
    admin = admin.toDto(),
    users = users.map { it.toDto() }.toMutableSet(),
)