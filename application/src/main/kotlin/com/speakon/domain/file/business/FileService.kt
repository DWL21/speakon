package com.speakon.domain.file.business

import com.speakon.domain.common.implement.Uuid
import com.speakon.domain.file.implement.*
import com.speakon.domain.user.implement.UserReader
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.util.UUID
import java.util.concurrent.CompletableFuture

@Service
class FileService(
    private val userReader: UserReader,
    private val fileReader: FileReader,
    private val fileWriter: FileWriter,
    private val asyncFileProcessor: AsyncFileProcessor,
    private val fileDownloader: FileDownloader,
    private val fileValidator: FileValidator,
    @Autowired(required = false)
    private val fileConversionService: FileConversionService? = null,
    @Autowired(required = false)
    private val geminiService: GeminiService? = null,
    @Autowired(required = false)
    private val fileTranscriptService: FileTranscriptService? = null,
) {
    fun uploadFile(uuid: Uuid, multipartFile: MultipartFile): StoredFile {
        fileValidator.validateFile(multipartFile)

        val user = userReader.getUser(uuid)

        val originalName = multipartFile.originalFilename ?: "file"
        val extension = originalName.substringAfterLast('.', "")
        val randomName = UUID.randomUUID().toString().replace("-", "")
        val storedName = if (extension.isNotEmpty()) "$randomName.$extension" else randomName

        val stored = StoredFile(
            originalName = originalName,
            storedName = storedName,
            contentType = multipartFile.contentType ?: "application/octet-stream",
            size = multipartFile.size,
            path = "pending",
            ownerId = user.id!!,
            status = FileStatus.PENDING
        )

        val savedFile = fileWriter.save(stored, user.id)

        asyncFileProcessor.processFileAsync(savedFile.id!!, uuid, multipartFile)

        return savedFile
    }

    fun listMyFiles(uuid: Uuid): List<StoredFile> {
        val user = userReader.getUser(uuid)
        return fileReader.findAllByOwnerId(user.id!!)
    }

    fun getFileStatus(uuid: Uuid, fileId: Long): StoredFile {
        val user = userReader.getUser(uuid)
        val file = fileReader.findById(fileId)
            ?: throw IllegalArgumentException("File not found with id: $fileId")

        if (file.ownerId != user.id) {
            throw IllegalArgumentException("File does not belong to user")
        }

        return file
    }

    fun convertPptxToPdf(uuid: Uuid, pptxFile: MultipartFile): ByteArray {
        val user = userReader.getUser(uuid)

        if (fileConversionService == null) {
            throw UnsupportedOperationException("File conversion service is not available. Please enable LibreOffice configuration.")
        }

        validatePptxFile(pptxFile)

        return fileConversionService.convertPptxToPdf(pptxFile)
    }

    fun uploadPdfToGemini(uuid: Uuid, fileId: Long): CompletableFuture<GeminiFileInfo> {
        val user = userReader.getUser(uuid)
        val storedFile = fileReader.findById(fileId)
            ?: throw IllegalArgumentException("File not found with id: $fileId")

        if (storedFile.ownerId != user.id) {
            throw IllegalArgumentException("File does not belong to user")
        }

        require(storedFile.contentType == "application/pdf") {
            "File is not a PDF"
        }

        if (geminiService == null) {
            throw UnsupportedOperationException("Gemini service is not available. Please enable Gemini configuration.")
        }

        val file = File(storedFile.path)
        return geminiService.uploadPdfToGemini(file, storedFile.storedName)
    }

    fun getGeminiFileInfo(fileName: String): GeminiFileInfo {
        if (geminiService == null) {
            throw UnsupportedOperationException("Gemini service is not available. Please enable Gemini configuration.")
        }

        return geminiService.getGeminiFileInfo(fileName)
    }

    fun generateContentWithGeminiFile(fileUri: String, prompt: String): GeminiGenerateContentResponse {
        if (geminiService == null) {
            throw UnsupportedOperationException("Gemini service is not available. Please enable Gemini configuration.")
        }

        return geminiService.generateContentWithFile(prompt, fileUri, "application/pdf")
    }

    fun generateConversation(conversationHistory: List<GeminiContent>): GeminiGenerateContentResponse {
        if (geminiService == null) {
            throw UnsupportedOperationException("Gemini service is not available. Please enable Gemini configuration.")
        }

        return geminiService.generateConversation(conversationHistory)
    }

    fun createUserMessage(text: String): GeminiContent {
        if (geminiService == null) {
            throw UnsupportedOperationException("Gemini service is not available. Please enable Gemini configuration.")
        }

        return geminiService.createUserMessage(text)
    }

    fun createModelMessage(text: String): GeminiContent {
        if (geminiService == null) {
            throw UnsupportedOperationException("Gemini service is not available. Please enable Gemini configuration.")
        }

        return geminiService.createModelMessage(text)
    }

    fun createFileTranscript(uuid: Uuid, fileId: Long, pages: List<TranscriptPage>): List<TranscriptPage> {
        if (fileTranscriptService == null) {
            throw UnsupportedOperationException("File transcript service is not available.")
        }

        return fileTranscriptService.createTranscript(uuid, fileId, pages)
    }

    fun getFileTranscript(uuid: Uuid, fileId: Long): List<TranscriptPage> {
        if (fileTranscriptService == null) {
            throw UnsupportedOperationException("File transcript service is not available.")
        }

        return fileTranscriptService.getTranscript(uuid, fileId)
    }

    fun getTranscriptPage(uuid: Uuid, fileId: Long, pageNumber: Int): TranscriptPage? {
        if (fileTranscriptService == null) {
            throw UnsupportedOperationException("File transcript service is not available.")
        }

        return fileTranscriptService.getTranscriptPage(uuid, fileId, pageNumber)
    }

    fun generateTranscriptFromPdf(uuid: Uuid, fileId: Long): CompletableFuture<List<TranscriptPage>> {
        if (fileTranscriptService == null) {
            throw UnsupportedOperationException("File transcript service is not available.")
        }

        // 먼저 PDF를 Gemini에 업로드
        val uploadFuture = uploadPdfToGemini(uuid, fileId)

        return uploadFuture.thenCompose { geminiFileInfo ->
            CompletableFuture.supplyAsync {
                fileTranscriptService.generateTranscriptFromPdf(uuid, fileId, geminiFileInfo.uri)
            }
        }
    }

    fun hasFileTranscript(uuid: Uuid, fileId: Long): Boolean {
        if (fileTranscriptService == null) {
            throw UnsupportedOperationException("File transcript service is not available.")
        }

        return fileTranscriptService.hasTranscript(uuid, fileId)
    }


    private fun validatePptxFile(file: MultipartFile) {
        require(!file.isEmpty) { "File is empty" }

        val contentType = file.contentType
        val fileName = file.originalFilename ?: ""

        val isValidPptx = contentType == "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
                fileName.endsWith(".pptx", ignoreCase = true)

        require(isValidPptx) { "File is not a valid PPTX file" }

        val maxSize = 20 * 1024 * 1024
        require(file.size <= maxSize) { "File size exceeds 20MB limit" }
    }
}
