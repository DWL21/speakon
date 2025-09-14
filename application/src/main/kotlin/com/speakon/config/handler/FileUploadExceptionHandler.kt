package com.speakon.config.handler

import com.speakon.domain.file.implement.exception.FileSizeExceededException
import com.speakon.domain.file.implement.exception.InvalidFileFormatException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.multipart.MaxUploadSizeExceededException

data class ErrorResponse(
    val timestamp: String = java.time.ZonedDateTime.now().format(java.time.format.DateTimeFormatter.ISO_OFFSET_DATE_TIME),
    val error: String,
    val message: String
)

@RestControllerAdvice
class FileUploadExceptionHandler {

    @ExceptionHandler(FileSizeExceededException::class)
    fun handleFileSizeExceeded(e: FileSizeExceededException): ResponseEntity<ErrorResponse> {
        return ResponseEntity
            .status(HttpStatus.PAYLOAD_TOO_LARGE)
            .body(ErrorResponse(error = "File Size Exceeded", message = e.message ?: "File size exceeds maximum allowed size"))
    }

    @ExceptionHandler(InvalidFileFormatException::class)
    fun handleInvalidFileFormat(e: InvalidFileFormatException): ResponseEntity<ErrorResponse> {
        return ResponseEntity
            .status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
            .body(ErrorResponse(error = "Invalid File Format", message = e.message ?: "Invalid file format"))
    }

    @ExceptionHandler(MaxUploadSizeExceededException::class)
    fun handleMaxUploadSizeExceeded(e: MaxUploadSizeExceededException): ResponseEntity<ErrorResponse> {
        return ResponseEntity
            .status(HttpStatus.PAYLOAD_TOO_LARGE)
            .body(ErrorResponse(error = "File Size Exceeded", message = "File size exceeds maximum allowed size (20MB)"))
    }
}