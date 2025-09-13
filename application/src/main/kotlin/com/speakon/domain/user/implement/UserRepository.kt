package com.speakon.domain.user.implement

import com.speakon.domain.common.implement.Uuid

interface UserRepository {
    fun save(user: User): User
    fun getByUuid(uuid: Uuid): User
}
