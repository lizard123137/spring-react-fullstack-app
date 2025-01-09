package com.dev.caps.backend.exceptions

class UserNotFoundException(id: String) : RuntimeException("User $id not found")