package com.speakon.api

import com.speakon.config.security.annotation.RequireAuth
import com.speakon.domain.common.business.dto.Response
import com.speakon.domain.common.implement.Uuid
import com.speakon.domain.file.business.FileService
import com.speakon.domain.file.business.dto.FileInfoResponse
import com.speakon.resolver.UserUuid
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@Tag(name = "File", description = "File upload APIs")
@RestController
@RequestMapping("/api/files")
class FileController(
    private val fileService: FileService
) {
    @Operation(
        summary = "파일 업로드",
        description = "파일을 업로드합니다. 허용되는 파일 형식: PDF, PPTX / 최대 파일 크기: 20MB"
    )
    @PostMapping("/upload", consumes = ["multipart/form-data"])
    @RequireAuth
    fun upload(
        @Parameter(hidden = true) @UserUuid uuid: String,
        @RequestPart("file") file: MultipartFile
    ): ResponseEntity<Response<FileInfoResponse>> {
        val stored = fileService.uploadFile(Uuid(uuid), file)
        val body = FileInfoResponse(
            id = stored.id ?: 0,
            originalName = stored.originalName,
            storedName = stored.storedName,
            contentType = stored.contentType,
            size = stored.size,
            path = stored.path,
            status = stored.status,
            errorMessage = stored.errorMessage
        )
        return ResponseEntity.ok(Response(result = body))
    }

    @Operation(summary = "내 파일 목록 조회")
    @GetMapping
    @RequireAuth
    fun listMyFiles(
        @Parameter(hidden = true) @UserUuid uuid: String,
    ): ResponseEntity<Response<List<FileInfoResponse>>> {
        val files = fileService.listMyFiles(Uuid(uuid))
        val body = files.map {
            FileInfoResponse(
                id = it.id ?: 0,
                originalName = it.originalName,
                storedName = it.storedName,
                contentType = it.contentType,
                size = it.size,
                path = it.path,
                status = it.status,
                errorMessage = it.errorMessage
            )
        }
        return ResponseEntity.ok(Response(result = body))
    }

    @Operation(
        summary = "파일 업로드 상태 조회",
        description = "특정 파일의 업로드 상태를 조회합니다."
    )
    @GetMapping("/{fileId}/status")
    @RequireAuth
    fun getFileStatus(
        @Parameter(hidden = true) @UserUuid uuid: String,
        @PathVariable fileId: Long
    ): ResponseEntity<Response<FileInfoResponse>> {
        val file = fileService.getFileStatus(Uuid(uuid), fileId)
        val body = FileInfoResponse(
            id = file.id ?: 0,
            originalName = file.originalName,
            storedName = file.storedName,
            contentType = file.contentType,
            size = file.size,
            path = file.path,
            status = file.status,
            errorMessage = file.errorMessage
        )
        return ResponseEntity.ok(Response(result = body))
    }
}
