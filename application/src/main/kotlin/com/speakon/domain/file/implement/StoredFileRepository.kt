package com.speakon.domain.file.implement

interface StoredFileRepository {
    fun save(entity: StoredFile, ownerId: Long): StoredFile
    fun findAllByOwnerId(ownerId: Long): List<StoredFile>
    fun findById(id: Long): StoredFile?
    fun updateStatus(id: Long, status: FileStatus, errorMessage: String? = null)
}
