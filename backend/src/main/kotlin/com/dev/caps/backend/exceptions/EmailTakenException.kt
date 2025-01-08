package com.dev.caps.backend.exceptions

class EmailTakenException(email: String): RuntimeException("Email $email Taken")