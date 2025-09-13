package com.speakon.domain.file.business.dto

data class FileInfoResponse(
    val id: Long,
    val originalName: String,
    val storedName: String,
    val contentType: String,
    val size: Long,
    val path: String,
)