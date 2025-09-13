package com.speakon.domain.user.implement

import com.speakon.domain.common.implement.Uuid

data class User(
    val id: Long? = null,
    val uuid: Uuid = Uuid.randomUUID(),
)