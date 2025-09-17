package com.speakon.domain.file.storage

import com.speakon.domain.file.implement.TranscriptPage
import com.speakon.domain.file.implement.TranscriptPageRepository
import org.springframework.stereotype.Repository

@Repository
class TranscriptPageRepositoryImpl(
    private val jpaTranscriptPageRepository: JpaTranscriptPageRepository
) : TranscriptPageRepository {

    override fun save(page: TranscriptPage): TranscriptPage {
        val entity = TranscriptPageEntity.create(page.fileId, page.pageNumber, page.content)
        val savedEntity = jpaTranscriptPageRepository.save(entity)
        return savedEntity.toDomain()
    }

    override fun saveAll(pages: List<TranscriptPage>): List<TranscriptPage> {
        val entities = pages.map { page ->
            TranscriptPageEntity.create(page.fileId, page.pageNumber, page.content)
        }
        val savedEntities = jpaTranscriptPageRepository.saveAll(entities)
        return savedEntities.map { it.toDomain() }
    }

    override fun findById(id: Long): TranscriptPage? {
        return jpaTranscriptPageRepository.findById(id).orElse(null)?.toDomain()
    }

    override fun findByFileId(fileId: Long): List<TranscriptPage> {
        return jpaTranscriptPageRepository.findByFileIdOrderByPageNumber(fileId)
            .map { it.toDomain() }
    }

    override fun findByFileIdAndPageNumber(fileId: Long, pageNumber: Int): TranscriptPage? {
        return jpaTranscriptPageRepository.findByFileIdAndPageNumber(fileId, pageNumber)?.toDomain()
    }

    override fun existsByFileId(fileId: Long): Boolean {
        return jpaTranscriptPageRepository.existsByFileId(fileId)
    }

    override fun deleteByFileId(fileId: Long) {
        jpaTranscriptPageRepository.deleteByFileId(fileId)
    }

    private fun TranscriptPageEntity.toDomain(): TranscriptPage {
        return TranscriptPage(
            id = this.id,
            fileId = this.fileId,
            pageNumber = this.pageNumber,
            content = this.content
        )
    }
}