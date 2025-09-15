package com.speakon.domain.file.implement

import java.io.File
import java.util.concurrent.CompletableFuture

interface GeminiClient {
    fun initiateUpload(file: File, displayName: String): GeminiUploadSession
    fun uploadFileAsync(uploadSession: GeminiUploadSession): CompletableFuture<GeminiFileInfo>
    fun getFileInfo(fileName: String): GeminiFileInfo
    fun generateContent(request: GeminiGenerateContentRequest): GeminiGenerateContentResponse
    fun generateConversation(conversationHistory: List<GeminiContent>): GeminiGenerateContentResponse
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

data class GeminiGenerateContentRequest(
    val contents: List<GeminiContent>
)

data class GeminiContent(
    val parts: List<GeminiPart>,
    val role: String? = null
)

sealed class GeminiPart {
    data class TextPart(val text: String) : GeminiPart()
    data class FileDataPart(val fileData: GeminiFileData) : GeminiPart()
}

data class GeminiFileData(
    val mimeType: String,
    val fileUri: String
)

data class GeminiGenerateContentResponse(
    val candidates: List<GeminiCandidate>
)

data class GeminiCandidate(
    val content: GeminiContent
)