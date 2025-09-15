package com.speakon.domain.file.business

import com.speakon.domain.common.implement.Uuid
import com.speakon.domain.file.implement.*
import com.speakon.domain.user.implement.UserReader
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

@Service
class FileService(
    private val userReader: UserReader,
    private val fileReader: FileReader,
    private val fileWriter: FileWriter,
    private val asyncFileProcessor: AsyncFileProcessor,
    private val fileDownloader: FileDownloader,
    private val fileValidator: FileValidator,
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
}
