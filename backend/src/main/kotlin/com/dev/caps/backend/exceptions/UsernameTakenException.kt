package com.dev.caps.backend.exceptions

class UsernameTakenException(username: String) : RuntimeException("Username $username is taken")