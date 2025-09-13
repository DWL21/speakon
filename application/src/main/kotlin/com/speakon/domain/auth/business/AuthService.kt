package com.speakon.domain.auth.business

import com.speakon.domain.auth.business.dto.TokenResponse
import com.speakon.domain.user.business.UserService
import com.speakon.config.security.exception.JwtUtils
import com.speakon.config.security.exception.InvalidRefreshTokenException
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userService: UserService,
    private val jwtUtils: JwtUtils
) {
    fun register(): TokenResponse {
        val user = userService.createUser()
        val accessToken = jwtUtils.generateAccessToken(user.uuid.value)
        val refreshToken = jwtUtils.generateRefreshToken(user.uuid.value)

        return TokenResponse(
            accessToken = accessToken,
            refreshToken = refreshToken
        )
    }

    fun refreshToken(refreshToken: String): TokenResponse {
        if (!jwtUtils.validateToken(refreshToken)) {
            throw InvalidRefreshTokenException()
        }

        val uuid = jwtUtils.getUserUuidFromToken(refreshToken)

        val accessToken = jwtUtils.generateAccessToken(uuid)
        val newRefreshToken = jwtUtils.generateRefreshToken(uuid)

        return TokenResponse(
            accessToken = accessToken,
            refreshToken = newRefreshToken
        )
    }
}
