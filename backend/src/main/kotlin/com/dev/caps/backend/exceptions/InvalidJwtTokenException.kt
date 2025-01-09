package com.dev.caps.backend.exceptions

class InvalidJwtTokenException(token: String) : RuntimeException("Invalid JWT token: $token")