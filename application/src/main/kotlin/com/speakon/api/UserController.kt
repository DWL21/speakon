package com.speakon.api

import com.speakon.domain.user.business.dto.UserInfoResponse
import com.speakon.domain.user.business.UserService
import com.speakon.domain.common.business.dto.Response
import com.speakon.domain.common.implement.Uuid
import com.speakon.resolver.UserUuid
import com.speakon.config.security.annotation.RequireAuth
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Tag(name = "User", description = "User APIs")
@RestController
@RequestMapping("/api/user")
class UserController(
    private val userService: UserService
) {
    @Operation(
        summary = "내 정보 조회",
        description = "현재 로그인한 사용자의 기본 정보를 조회합니다."
    )
    @GetMapping("/me")
    @RequireAuth
    fun getMyInfo(
        @Parameter(hidden = true) @UserUuid uuid: String
    ): ResponseEntity<Response<UserInfoResponse>> {
        val user = userService.getUser(Uuid(uuid))
        val response = UserInfoResponse(uuid = user.uuid.value)
        return ResponseEntity.ok(Response(result = response))
    }
}
