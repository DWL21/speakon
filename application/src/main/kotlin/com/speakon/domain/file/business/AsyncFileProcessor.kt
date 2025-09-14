package com.speakon.domain.file.business

import com.speakon.domain.common.implement.Uuid
import com.speakon.domain.file.implement.*
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class AsyncFileProcessor(
    private val fileUploader: FileUploader,
    private val storedFileRepository: StoredFileRepository,
    private val fileValidator: FileValidator
) {
    private val logger = LoggerFactory.getLogger(this::class.java)

    @Async
    fun processFileAsync(fileId: Long, uuid: Uuid, multipartFile: MultipartFile) {
        try {
            logger.info("Starting async file processing for fileId: $fileId")

            storedFileRepository.updateStatus(fileId, FileStatus.PROCESSING)

            fileValidator.validateFile(multipartFile)

            fileUploader.uploadFile(uuid, multipartFile)

            storedFileRepository.updateStatus(fileId, FileStatus.COMPLETED)

            logger.info("Successfully processed file with fileId: $fileId")
        } catch (e: Exception) {
            logger.error("Error processing file with fileId: $fileId", e)
            storedFileRepository.updateStatus(fileId, FileStatus.FAILED, e.message)
        }
    }
}