package com.speakon.api

import com.speakon.api.dto.GoogleOAuthRequest
import com.speakon.api.dto.RefreshTokenRequest
import com.speakon.config.security.annotation.RequireAuth
import com.speakon.domain.common.business.dto.Response
import com.speakon.resolver.UserUuid
import com.speakon.domain.auth.business.AuthService
import com.speakon.domain.auth.business.dto.TokenResponse
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Tag(name = "Auth", description = "Authentication APIs")
@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService
) {
    @Operation(
        summary = "회원 가입",
        description = "새로운 사용자 계정을 생성하고 인증을 위한 JWT 토큰을 발급합니다. 이 엔드포인트는 사용자를 위한 고유한 UUID를 생성하고 액세스 토큰과 리프레시 토큰을 모두 반환합니다."
    )
    @PostMapping("/register")
    fun register(): ResponseEntity<Response<TokenResponse>> {
        val response = authService.register()
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(Response(result = response))
    }

    @Operation(
        summary = "토큰 갱신",
        description = "유효한 리프레시 토큰을 사용하여 JWT 토큰을 갱신합니다. 이 엔드포인트는 제공된 리프레시 토큰을 검증하고 새로운 액세스 토큰과 리프레시 토큰을 발급합니다."
    )
    @PostMapping("/refresh")
    fun refreshToken(
        @Valid @RequestBody request: RefreshTokenRequest
    ): ResponseEntity<Response<TokenResponse>> {
        val response = authService.refreshToken(request.refreshToken)
        return ResponseEntity.ok(Response(result = response))
    }

    @Operation(
        summary = "구글 로그인",
        description = "authorization code 검증 후 해당 이메일과 UUID가 일치하면 JWT를 발급합니다. 구글 계정이 이미 다른 유저에 등록되어 있으면 연결된 유저의 토큰을 반환합니다."
    )
    @PostMapping("/google")
    @RequireAuth
    fun loginWithGoogle(
        @Parameter(hidden = true) @UserUuid uuid: String,
        @Valid @RequestBody request: GoogleOAuthRequest
    ): ResponseEntity<Response<TokenResponse>> {
        val response = authService.loginWithGoogle(request.toCommand(uuid))
        return ResponseEntity.ok(Response(result = response))
    }
}
