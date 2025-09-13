package com.speakon.domain.user.storage

import com.speakon.domain.user.implement.User
import com.speakon.domain.user.implement.UserRepository
import com.speakon.domain.common.implement.Uuid
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

interface UserJpaRepository : JpaRepository<UserEntity, Long> {
    fun findByUuid(uuid: String): UserEntity?
    fun existsByUuid(uuid: String): Boolean
}

@Repository
class UserRepositoryImpl(
    private val userJpaRepository: UserJpaRepository
) : UserRepository {

    override fun save(user: User): User {
        val userEntity = UserEntity.from(user)
        val savedEntity = userJpaRepository.save(userEntity)
        return savedEntity.toDomain()
    }

    override fun findByUuid(uuid: Uuid): User? {
        return userJpaRepository.findByUuid(uuid.value)?.toDomain()
    }

    override fun existsByUuid(uuid: Uuid): Boolean {
        return userJpaRepository.existsByUuid(uuid.value)
    }
}