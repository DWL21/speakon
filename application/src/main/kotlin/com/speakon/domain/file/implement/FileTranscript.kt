package com.speakon.domain.file.implement

data class TranscriptPage(
    val id: Long? = null,
    val fileId: Long,
    val pageNumber: Int,
    val content: String
)