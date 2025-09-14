package com.speakon.domain.file.implement

import com.speakon.config.properties.FileStorageProperties
import com.speakon.domain.common.implement.Uuid
import org.springframework.stereotype.Component
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption

data class UploadResult(
    val originalName: String,
    val storedName: String,
    val path: String
)

@Component
class FileUploader(
    private val fileStorageProperties: FileStorageProperties,
) {
    fun uploadFile(uuid: Uuid, multipartFile: MultipartFile): UploadResult {
        val baseDir: Path = Path.of(fileStorageProperties.basePath, uuid.value)
        Files.createDirectories(baseDir)

        val originalName = multipartFile.originalFilename ?: "file"
        val extension = originalName.substringAfterLast('.', "")
        val randomName = java.util.UUID.randomUUID().toString().replace("-", "")
        val storedName = if (extension.isNotEmpty()) "$randomName.$extension" else randomName
        val destination = baseDir.resolve(storedName)

        multipartFile.inputStream.use { input ->
            Files.copy(input, destination, StandardCopyOption.REPLACE_EXISTING)
        }

        return UploadResult(
            originalName = originalName,
            storedName = storedName,
            path = destination.toString()
        )
    }

}
