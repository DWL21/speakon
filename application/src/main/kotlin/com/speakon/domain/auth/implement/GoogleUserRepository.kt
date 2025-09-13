package com.speakon.domain.auth.implement

import com.speakon.domain.common.implement.Uuid
import com.yourssu.signal.domain.auth.implement.GoogleUser

interface GoogleUserRepository {
    fun save(googleUser: GoogleUser): GoogleUser
    fun findUuidByIdentifier(identifier: String): Uuid?
    fun existsBy(uuid: Uuid): Boolean
}
