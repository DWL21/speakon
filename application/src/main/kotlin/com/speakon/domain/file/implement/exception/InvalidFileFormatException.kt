package com.speakon.domain.file.implement.exception

class InvalidFileFormatException(
    val allowedFormats: List<String>,
    val actualFormat: String?
) : RuntimeException("Invalid file format. Allowed formats: ${allowedFormats.joinToString(", ")}, Actual: $actualFormat")