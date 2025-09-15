package com.speakon.infrastructure.gemini

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.speakon.domain.file.implement.GeminiClient
import com.speakon.domain.file.implement.GeminiFileInfo
import com.speakon.domain.file.implement.GeminiUploadSession
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.springframework.beans.factory.annotation.Value
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Component
import java.io.File
import java.util.concurrent.CompletableFuture

@Component
class GeminiClientImpl(
    private val httpClient: OkHttpClient,
    private val objectMapper: ObjectMapper
) : GeminiClient {

    @Value("\${gemini.api.key}")
    private lateinit var apiKey: String

    @Value("\${gemini.api.base-url:https://generativelanguage.googleapis.com/v1beta}")
    private lateinit var baseUrl: String

    override fun initiateUpload(file: File, displayName: String): GeminiUploadSession {
        require(file.exists()) { "File does not exist: ${file.absolutePath}" }

        val numBytes = file.length()
        val mimeType = "application/pdf"

        // Step 1: Initial resumable request (동기)
        val initialRequestBody = """
            {
                "file": {
                    "display_name": "$displayName"
                }
            }
        """.trimIndent()

        val initialRequest = Request.Builder()
            .url("$baseUrl/upload/v1beta/files")
            .header("x-goog-api-key", apiKey)
            .header("X-Goog-Upload-Protocol", "resumable")
            .header("X-Goog-Upload-Command", "start")
            .header("X-Goog-Upload-Header-Content-Length", numBytes.toString())
            .header("X-Goog-Upload-Header-Content-Type", mimeType)
            .header("Content-Type", "application/json")
            .post(initialRequestBody.toRequestBody("application/json".toMediaType()))
            .build()

        val initialResponse = httpClient.newCall(initialRequest).execute()
        if (!initialResponse.isSuccessful) {
            throw RuntimeException("Failed to initiate upload: ${initialResponse.code} - ${initialResponse.body?.string()}")
        }

        val uploadUrl = initialResponse.header("x-goog-upload-url")
            ?: throw RuntimeException("Upload URL not found in response headers")
        initialResponse.close()

        return GeminiUploadSession(
            uploadUrl = uploadUrl,
            file = file,
            displayName = displayName,
            fileSize = numBytes
        )
    }

    @Async
    override fun uploadFileAsync(uploadSession: GeminiUploadSession): CompletableFuture<GeminiFileInfo> {
        return CompletableFuture.supplyAsync {
            val mimeType = "application/pdf"

            // Step 2: Upload the actual bytes (비동기)
            val uploadRequest = Request.Builder()
                .url(uploadSession.uploadUrl)
                .header("Content-Length", uploadSession.fileSize.toString())
                .header("X-Goog-Upload-Offset", "0")
                .header("X-Goog-Upload-Command", "upload, finalize")
                .post(uploadSession.file.readBytes().toRequestBody(mimeType.toMediaType()))
                .build()

            val uploadResponse = httpClient.newCall(uploadRequest).execute()
            if (!uploadResponse.isSuccessful) {
                throw RuntimeException("Failed to upload file: ${uploadResponse.code} - ${uploadResponse.body?.string()}")
            }

            val responseBody = uploadResponse.body?.string()
                ?: throw RuntimeException("Empty response body")
            uploadResponse.close()

            parseGeminiFileInfo(responseBody)
        }
    }

    private fun parseGeminiFileInfo(responseBody: String): GeminiFileInfo {
        val jsonNode: JsonNode = objectMapper.readTree(responseBody)
        val fileNode = jsonNode.get("file")
            ?: throw RuntimeException("Invalid response format: missing 'file' field")

        return GeminiFileInfo(
            uri = fileNode.get("uri")?.asText() ?: "",
            name = fileNode.get("name")?.asText() ?: "",
            displayName = fileNode.get("displayName")?.asText() ?: "",
            mimeType = fileNode.get("mimeType")?.asText() ?: "",
            sizeBytes = fileNode.get("sizeBytes")?.asLong() ?: 0L,
            createTime = fileNode.get("createTime")?.asText() ?: "",
            updateTime = fileNode.get("updateTime")?.asText() ?: "",
            expirationTime = fileNode.get("expirationTime")?.asText() ?: "",
            sha256Hash = fileNode.get("sha256Hash")?.asText() ?: "",
            state = fileNode.get("state")?.asText() ?: ""
        )
    }
}