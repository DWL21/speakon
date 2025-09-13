package com.speakon.domain.user.implement

import com.speakon.domain.common.implement.Uuid
import org.springframework.stereotype.Component

@Component
class UserReader(
    private val userRepository: UserRepository
) {
    fun getUser(uuid: Uuid): User {
        return userRepository.getByUuid(uuid)
    }
}
