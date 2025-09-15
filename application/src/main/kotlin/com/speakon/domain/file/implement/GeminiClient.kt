package com.speakon.domain.file.implement

import java.io.File
import java.util.concurrent.CompletableFuture

interface GeminiClient {
    fun initiateUpload(file: File, displayName: String): GeminiUploadSession
    fun uploadFileAsync(uploadSession: GeminiUploadSession): CompletableFuture<GeminiFileInfo>
    fun getFileInfo(fileName: String): GeminiFileInfo
}

data class GeminiUploadSession(
    val uploadUrl: String,
    val file: File,
    val displayName: String,
    val fileSize: Long
)

data class GeminiFileInfo(
    val uri: String,
    val name: String,
    val displayName: String,
    val mimeType: String,
    val sizeBytes: Long,
    val createTime: String,
    val updateTime: String,
    val expirationTime: String,
    val sha256Hash: String,
    val state: String
)