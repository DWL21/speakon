package com.speakon.domain.auth.implement

import com.yourssu.signal.domain.auth.implement.GoogleUser
import org.springframework.stereotype.Component

@Component
class GoogleUserWriter(
    private val googleUserRepository: GoogleUserRepository,
) {
    fun save(googleUser: GoogleUser): GoogleUser {
        return googleUserRepository.save(googleUser)
    }
}
