package com.speakon.domain.file.business

import com.speakon.domain.file.implement.GeminiClient
import com.speakon.domain.file.implement.GeminiFileInfo
import com.speakon.domain.file.implement.GeminiUploadSession
import org.springframework.stereotype.Service
import java.io.File
import java.util.concurrent.CompletableFuture

@Service
class GeminiService(
    private val geminiClient: GeminiClient
) {

    fun initiateUploadPdfToGemini(pdfFile: File, displayName: String): GeminiUploadSession {
        require(pdfFile.exists()) { "PDF file does not exist: ${pdfFile.absolutePath}" }
        require(pdfFile.extension.lowercase() == "pdf") { "File is not a PDF" }

        return geminiClient.initiateUpload(pdfFile, displayName)
    }

    private fun uploadPdfAsync(uploadSession: GeminiUploadSession): CompletableFuture<GeminiFileInfo> {
        return geminiClient.uploadFileAsync(uploadSession)
    }

    fun uploadPdfToGemini(pdfFile: File, displayName: String): CompletableFuture<GeminiFileInfo> {
        val uploadSession = initiateUploadPdfToGemini(pdfFile, displayName)
        return uploadPdfAsync(uploadSession)
    }

    fun getGeminiFileInfo(fileName: String): GeminiFileInfo {
        return geminiClient.getFileInfo(fileName)
    }
}
