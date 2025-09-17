package com.speakon.domain.file.business

import com.speakon.domain.common.implement.Uuid
import com.speakon.domain.file.implement.*
import com.speakon.domain.user.implement.UserReader
import org.springframework.stereotype.Service

@Service
class FileTranscriptService(
    private val userReader: UserReader,
    private val fileReader: FileReader,
    private val transcriptPageRepository: TranscriptPageRepository,
    private val geminiService: GeminiService
) {

    fun createTranscript(uuid: Uuid, fileId: Long, pages: List<TranscriptPage>): List<TranscriptPage> {
        val user = userReader.getUser(uuid)
        val storedFile = fileReader.findById(fileId)
            ?: throw IllegalArgumentException("File not found with id: $fileId")

        if (storedFile.ownerId != user.id) {
            throw IllegalArgumentException("File does not belong to user")
        }

        val transcriptPages = pages.map { page ->
            page.copy(fileId = fileId)
        }

        return transcriptPageRepository.saveAll(transcriptPages)
    }

    fun getTranscript(uuid: Uuid, fileId: Long): List<TranscriptPage> {
        val user = userReader.getUser(uuid)
        val storedFile = fileReader.findById(fileId)
            ?: throw IllegalArgumentException("File not found with id: $fileId")

        if (storedFile.ownerId != user.id) {
            throw IllegalArgumentException("File does not belong to user")
        }

        return transcriptPageRepository.findByFileId(fileId)
    }

    fun getTranscriptPage(uuid: Uuid, fileId: Long, pageNumber: Int): TranscriptPage? {
        val user = userReader.getUser(uuid)
        val storedFile = fileReader.findById(fileId)
            ?: throw IllegalArgumentException("File not found with id: $fileId")

        if (storedFile.ownerId != user.id) {
            throw IllegalArgumentException("File does not belong to user")
        }

        return transcriptPageRepository.findByFileIdAndPageNumber(fileId, pageNumber)
    }

    fun generateTranscriptFromPdf(uuid: Uuid, fileId: Long, geminiFileUri: String): List<TranscriptPage> {
        val user = userReader.getUser(uuid)
        val storedFile = fileReader.findById(fileId)
            ?: throw IllegalArgumentException("File not found with id: $fileId")

        if (storedFile.ownerId != user.id) {
            throw IllegalArgumentException("File does not belong to user")
        }

        require(storedFile.contentType == "application/pdf") {
            "File is not a PDF"
        }

        // Gemini로 페이지별 텍스트 추출
        val extractedPages = extractTextByPages(fileId, geminiFileUri)

        return transcriptPageRepository.saveAll(extractedPages)
    }

    fun hasTranscript(uuid: Uuid, fileId: Long): Boolean {
        val user = userReader.getUser(uuid)
        val storedFile = fileReader.findById(fileId)
            ?: throw IllegalArgumentException("File not found with id: $fileId")

        if (storedFile.ownerId != user.id) {
            throw IllegalArgumentException("File does not belong to user")
        }

        return transcriptPageRepository.existsByFileId(fileId)
    }

    private fun extractTextByPages(fileId: Long, geminiFileUri: String): List<TranscriptPage> {
        // Gemini API를 사용해서 PDF의 페이지별 텍스트를 추출
        val prompt = """
        Please extract the text content from each page of this PDF document.
        Format the response as JSON with the following structure:
        {
          "pages": [
            {"pageNumber": 1, "content": "text content of page 1"},
            {"pageNumber": 2, "content": "text content of page 2"},
            ...
          ]
        }
        Preserve the original formatting and structure as much as possible.
        """.trimIndent()

        val response = geminiService.generateContentWithFile(prompt, geminiFileUri, "application/pdf")

        // 응답에서 텍스트 추출
        val responseText = response.candidates.firstOrNull()?.content?.parts
            ?.filterIsInstance<GeminiPart.TextPart>()
            ?.firstOrNull()?.text ?: ""

        // JSON 파싱 및 페이지 생성 (간단한 구현)
        return parseJsonToPages(fileId, responseText)
    }

    private fun parseJsonToPages(fileId: Long, jsonResponse: String): List<TranscriptPage> {
        // 실제 구현에서는 Jackson ObjectMapper 등을 사용해야 함
        // 여기서는 간단한 예시
        return try {
            // JSON 파싱 로직 (실제로는 ObjectMapper 사용 권장)
            val pages = mutableListOf<TranscriptPage>()

            // 임시로 페이지 생성 (실제로는 JSON 파싱)
            if (jsonResponse.isNotBlank()) {
                pages.add(TranscriptPage(
                    fileId = fileId,
                    pageNumber = 1,
                    content = jsonResponse
                ))
            }

            pages
        } catch (e: Exception) {
            // 파싱 실패 시 전체 텍스트를 하나의 페이지로 처리
            listOf(TranscriptPage(
                fileId = fileId,
                pageNumber = 1,
                content = jsonResponse
            ))
        }
    }
}