package com.speakon.domain.file.storage

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface JpaTranscriptPageRepository : JpaRepository<TranscriptPageEntity, Long> {
    fun findByFileIdOrderByPageNumber(fileId: Long): List<TranscriptPageEntity>

    fun findByFileIdAndPageNumber(fileId: Long, pageNumber: Int): TranscriptPageEntity?

    fun existsByFileId(fileId: Long): Boolean

    fun deleteByFileId(fileId: Long)
}