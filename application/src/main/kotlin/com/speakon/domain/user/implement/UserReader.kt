package com.speakon.domain.user.implement

import com.speakon.domain.common.implement.Uuid
import org.springframework.stereotype.Component

@Component
class UserReader(
    private val userRepository: UserRepository
) {
    fun findByUser(uuid: Uuid): User? {
        return userRepository.findByUuid(uuid)
    }

    fun existsByUuid(uuid: Uuid): Boolean {
        return userRepository.existsByUuid(uuid)
    }
}
