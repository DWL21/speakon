package com.speakon.domain.auth.storage

import com.speakon.domain.auth.storage.exception.NotFoundUserException
import com.speakon.domain.common.implement.Uuid
import com.speakon.domain.user.implement.User
import com.speakon.domain.user.implement.UserRepository
import com.speakon.domain.user.storage.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Component

@Component
class UserRepositoryImpl(
    private val jpaRepository: JpaUserRepository,
): UserRepository {
    override fun save(user: User): User {
        val entity = jpaRepository.save(UserEntity.from(user))
        return entity.toDomain()
    }

    override fun getByUuid(uuid: Uuid): User {
        return jpaRepository.findByUuid(uuid.value)
            ?.toDomain()
            ?: throw NotFoundUserException()
    }
}

interface JpaUserRepository: JpaRepository<UserEntity, Long> {
    fun findByUuid(uuid: String): UserEntity?
}
