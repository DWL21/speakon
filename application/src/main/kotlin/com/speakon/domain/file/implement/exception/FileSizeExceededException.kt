package com.speakon.domain.file.implement.exception

class FileSizeExceededException(
    val maxSize: Long,
    val actualSize: Long
) : RuntimeException("File size exceeds maximum allowed size. Max: ${maxSize / (1024 * 1024)}MB, Actual: ${actualSize / (1024 * 1024)}MB")