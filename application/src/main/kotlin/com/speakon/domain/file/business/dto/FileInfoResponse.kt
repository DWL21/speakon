package com.speakon.domain.file.business.dto

import com.speakon.domain.file.implement.FileStatus

data class FileInfoResponse(
    val id: Long,
    val originalName: String,
    val storedName: String,
    val contentType: String,
    val size: Long,
    val path: String,
    val status: FileStatus,
    val errorMessage: String? = null
)