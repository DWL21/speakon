package com.speakon.domain.file.implement

enum class FileStatus {
    PENDING,
    PROCESSING,
    COMPLETED,
    FAILED
}

data class StoredFile(
    val id: Long? = null,
    val originalName: String,
    val storedName: String,
    val contentType: String,
    val size: Long,
    val path: String,
    val ownerId: Long,
    val status: FileStatus = FileStatus.PENDING,
    val errorMessage: String? = null,
)
