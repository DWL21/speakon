package com.speakon.config.properties

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "storage.files")
data class FileStorageProperties(
    val basePath: String,
    val maxSize: Long,
    val allowedFormats: String,
) {
    fun getAllowedFormatsList(): List<String> {
        return allowedFormats.split(",")
            .map { it.trim().lowercase() }
    }
}
