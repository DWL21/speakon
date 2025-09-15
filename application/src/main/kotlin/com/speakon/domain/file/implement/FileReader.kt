package com.speakon.domain.file.implement

import org.springframework.stereotype.Component

@Component
class FileReader(
    private val repository: StoredFileRepository
) {
    fun findAllByOwnerId(ownerId: Long): List<StoredFile> {
        return repository.findAllByOwnerId(ownerId)
    }

    fun findById(id: Long): StoredFile? {
        return repository.findById(id)
    }
}
