package com.speakon.domain.file.implement

interface TranscriptPageRepository {
    fun save(page: TranscriptPage): TranscriptPage
    fun saveAll(pages: List<TranscriptPage>): List<TranscriptPage>
    fun findById(id: Long): TranscriptPage?
    fun findByFileId(fileId: Long): List<TranscriptPage>
    fun findByFileIdAndPageNumber(fileId: Long, pageNumber: Int): TranscriptPage?
    fun existsByFileId(fileId: Long): Boolean
    fun deleteByFileId(fileId: Long)
}