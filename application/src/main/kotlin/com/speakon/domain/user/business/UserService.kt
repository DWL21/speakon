package com.speakon.domain.user.business

import com.speakon.domain.user.implement.User
import com.speakon.domain.user.implement.UserReader
import com.speakon.domain.user.implement.UserWriter
import com.speakon.domain.common.implement.Uuid
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userReader: UserReader,
    private val userWriter: UserWriter
) {
    fun createUser(): User {
        val user = User()
        return userWriter.save(user)
    }

    fun findByUser(uuid: Uuid): User? {
        return userReader.findByUser(uuid)
    }

    fun getUserOrCreate(uuid: Uuid): User {
        return userReader.findByUser(uuid) ?: run {
            val user = User(uuid = uuid)
            userWriter.save(user)
        }
    }
}
