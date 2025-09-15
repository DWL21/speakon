package com.speakon.domain.file.business

import io.github.oshai.kotlinlogging.KotlinLogging
import org.jodconverter.core.DocumentConverter
import org.jodconverter.core.document.DefaultDocumentFormatRegistry
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.nio.file.Files
import java.nio.file.Path
import java.util.*

@Service
@ConditionalOnProperty(
    name = ["jodconverter.enabled"],
    havingValue = "true",
    matchIfMissing = false
)
class FileConversionService(
    private val documentConverter: DocumentConverter
) {
    private val logger = KotlinLogging.logger {}
    private val formatRegistry = DefaultDocumentFormatRegistry.getInstance()

    fun convertPptxToPdf(pptxFile: MultipartFile): ByteArray {
        validatePptxFile(pptxFile)

        val tempDir = Files.createTempDirectory("pptx-conversion")
        return try {
            val inputFile = saveTempFile(pptxFile, tempDir)
            val outputFile = createTempOutputFile(tempDir)

            performConversion(inputFile, outputFile)

            Files.readAllBytes(outputFile.toPath())
        } catch (e: Exception) {
            logger.error(e) { "Failed to convert PPTX to PDF: ${pptxFile.originalFilename}" }
            throw ConversionException("Failed to convert PPTX to PDF", e)
        } finally {
            cleanupTempDirectory(tempDir)
        }
    }

    fun convertFile(inputFile: MultipartFile, targetFormat: String): ByteArray {
        val tempDir = Files.createTempDirectory("file-conversion")
        return try {
            val input = saveTempFile(inputFile, tempDir)
            val outputExtension = targetFormat.lowercase()
            val output = File(tempDir.toFile(), "${UUID.randomUUID()}.$outputExtension")

            documentConverter.convert(input).to(output).execute()

            Files.readAllBytes(output.toPath())
        } catch (e: Exception) {
            logger.error(e) { "Failed to convert file: ${inputFile.originalFilename} to $targetFormat" }
            throw ConversionException("Failed to convert file to $targetFormat", e)
        } finally {
            cleanupTempDirectory(tempDir)
        }
    }

    fun isConversionSupported(sourceFormat: String, targetFormat: String): Boolean {
        val source = formatRegistry.getFormatByExtension(sourceFormat.lowercase())
        val target = formatRegistry.getFormatByExtension(targetFormat.lowercase())

        return source != null && target != null
    }

    private fun validatePptxFile(file: MultipartFile) {
        require(!file.isEmpty) { "File is empty" }

        val contentType = file.contentType
        val fileName = file.originalFilename ?: ""

        val isValidPptx = contentType == "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
                fileName.endsWith(".pptx", ignoreCase = true)

        require(isValidPptx) { "File is not a valid PPTX file" }
    }

    private fun saveTempFile(file: MultipartFile, tempDir: Path): File {
        val originalName = file.originalFilename ?: "file"
        val extension = originalName.substringAfterLast('.', "")
        val tempFileName = "${UUID.randomUUID()}.$extension"
        val tempFile = File(tempDir.toFile(), tempFileName)

        file.transferTo(tempFile)
        return tempFile
    }

    private fun createTempOutputFile(tempDir: Path): File {
        return File(tempDir.toFile(), "${UUID.randomUUID()}.pdf")
    }

    private fun performConversion(inputFile: File, outputFile: File) {
        try {
            documentConverter
                .convert(inputFile)
                .to(outputFile)
                .execute()
        } catch (e: Exception) {
            throw ConversionException("Conversion process failed", e)
        }
    }

    private fun cleanupTempDirectory(tempDir: Path) {
        try {
            Files.walk(tempDir)
                .sorted(Comparator.reverseOrder())
                .forEach { Files.deleteIfExists(it) }
        } catch (e: Exception) {
            logger.warn(e) { "Failed to cleanup temp directory: $tempDir" }
        }
    }
}

class ConversionException(message: String, cause: Throwable? = null) : RuntimeException(message, cause)
