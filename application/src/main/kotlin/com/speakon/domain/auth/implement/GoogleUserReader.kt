package com.speakon.domain.auth.implement

import com.speakon.domain.common.implement.Uuid
import org.springframework.stereotype.Component

@Component
class GoogleUserReader(
    private val googleUserRepository: GoogleUserRepository,
) {
    fun findUuidByIdentifier(identifier: String): Uuid? {
        return googleUserRepository.findUuidByIdentifier(identifier)
    }

    fun existsByUuid(uuid: Uuid): Boolean {
        return googleUserRepository.existsBy(uuid)
    }
}
