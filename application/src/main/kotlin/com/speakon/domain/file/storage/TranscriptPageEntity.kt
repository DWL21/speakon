package com.speakon.domain.file.storage

import jakarta.persistence.*

@Entity
@Table(name = "transcript_pages")
class TranscriptPageEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(name = "file_id", nullable = false)
    val fileId: Long,

    @Column(name = "page_number", nullable = false)
    val pageNumber: Int,

    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    val content: String
) {
    companion object {
        fun create(fileId: Long, pageNumber: Int, content: String): TranscriptPageEntity {
            return TranscriptPageEntity(
                fileId = fileId,
                pageNumber = pageNumber,
                content = content
            )
        }
    }
}