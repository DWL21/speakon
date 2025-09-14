package com.speakon.domain.file.implement

import com.speakon.config.properties.FileStorageProperties
import com.speakon.domain.file.implement.exception.FileSizeExceededException
import com.speakon.domain.file.implement.exception.InvalidFileFormatException
import org.springframework.stereotype.Component
import org.springframework.web.multipart.MultipartFile

@Component
class FileValidator(
    private val fileStorageProperties: FileStorageProperties
) {
    companion object {
        private val ALLOWED_CONTENT_TYPES = mapOf(
            "pdf" to "application/pdf",
            "pptx" to "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        )
    }

    fun validateFile(file: MultipartFile) {
        validateFileSize(file)
        validateFileFormat(file)
    }

    private fun validateFileSize(file: MultipartFile) {
        val maxSize = fileStorageProperties.maxSize
        if (file.size > maxSize) {
            throw FileSizeExceededException(maxSize, file.size)
        }
    }

    private fun validateFileFormat(file: MultipartFile) {
        val allowedFormats = fileStorageProperties.getAllowedFormatsList()
        val fileName = file.originalFilename ?: throw InvalidFileFormatException(allowedFormats, null)
        val extension = fileName.substringAfterLast('.', "").lowercase()

        if (extension !in allowedFormats) {
            throw InvalidFileFormatException(allowedFormats, extension)
        }

        val contentType = file.contentType
        val expectedContentType = ALLOWED_CONTENT_TYPES[extension]
        if (contentType != null && expectedContentType != null && contentType != expectedContentType) {
            throw InvalidFileFormatException(allowedFormats, contentType)
        }
    }
}