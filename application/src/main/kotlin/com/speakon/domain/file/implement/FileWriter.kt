package com.speakon.domain.file.implement

import org.springframework.stereotype.Component

@Component
class FileWriter(
    private val repository: StoredFileRepository
) {
    fun save(entity: StoredFile, ownerId: Long): StoredFile {
        return repository.save(entity, ownerId)
    }
}
