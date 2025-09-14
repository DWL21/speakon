package com.speakon.domain.file.storage

import com.speakon.domain.file.implement.FileStatus
import com.speakon.domain.file.implement.StoredFile
import com.speakon.domain.file.implement.StoredFileRepository
import com.speakon.domain.user.storage.UserEntity
import jakarta.persistence.EntityManager
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Component

@Component
class FileRepositoryImpl(
    private val jpaRepository: JpaFileRepository,
    private val entityManager: EntityManager,
) : StoredFileRepository {
    override fun save(entity: StoredFile, ownerId: Long): StoredFile {
        val fileEntity = FileEntity(
            originalName = entity.originalName,
            storedName = entity.storedName,
            contentType = entity.contentType,
            size = entity.size,
            path = entity.path,
            owner = entityManager.getReference(UserEntity::class.java, ownerId),
            status = entity.status,
            errorMessage = entity.errorMessage
        )
        val saved = jpaRepository.save(fileEntity)
        return saved.let {
            StoredFile(
                id = it.id,
                originalName = it.originalName,
                storedName = it.storedName,
                contentType = it.contentType,
                size = it.size,
                path = it.path,
                ownerId = it.owner.id!!,
                status = it.status,
                errorMessage = it.errorMessage
            )
        }
    }

    override fun findAllByOwnerId(ownerId: Long): List<StoredFile> {
        return jpaRepository.findAllByOwner_Id(ownerId).map {
            StoredFile(
                id = it.id,
                originalName = it.originalName,
                storedName = it.storedName,
                contentType = it.contentType,
                size = it.size,
                path = it.path,
                ownerId = it.owner.id!!,
                status = it.status,
                errorMessage = it.errorMessage
            )
        }
    }

    override fun findById(id: Long): StoredFile? {
        return jpaRepository.findById(id).orElse(null)?.let {
            StoredFile(
                id = it.id,
                originalName = it.originalName,
                storedName = it.storedName,
                contentType = it.contentType,
                size = it.size,
                path = it.path,
                ownerId = it.owner.id!!,
                status = it.status,
                errorMessage = it.errorMessage
            )
        }
    }

    override fun updateStatus(id: Long, status: FileStatus, errorMessage: String?) {
        jpaRepository.findById(id).ifPresent { entity ->
            entity.status = status
            entity.errorMessage = errorMessage
            jpaRepository.save(entity)
        }
    }
}

interface JpaFileRepository : JpaRepository<FileEntity, Long> {
    fun findAllByOwner_Id(ownerId: Long): List<FileEntity>
}
