package com.speakon.domain.auth.business

import com.speakon.config.JwtProperties
import com.speakon.config.security.exception.InvalidJwtTokenException
import com.speakon.config.security.exception.JwtUtils
import com.speakon.domain.common.implement.Uuid
import com.speakon.domain.user.implement.User
import com.speakon.domain.user.implement.UserReader
import com.speakon.domain.user.implement.UserWriter
import com.speakon.domain.auth.business.command.GoogleOAuthCommand
import com.speakon.domain.auth.business.dto.TokenResponse
import com.speakon.domain.auth.business.exception.GoogleAccountAlreadyLinkedException
import com.speakon.domain.auth.business.exception.InvalidGoogleCodeException
import com.speakon.domain.auth.implement.GoogleUserReader
import com.speakon.domain.auth.implement.GoogleUserWriter
import com.speakon.domain.auth.implement.OAuthOutputPort
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class AuthService(
    private val jwtUtils: JwtUtils,
    private val jwtProperties: JwtProperties,
    private val userWriter: UserWriter,
    private val userReader: UserReader,
    private val googleUserReader: GoogleUserReader,
    private val googleUserWriter: GoogleUserWriter,
    private val oAuthOutputPort: OAuthOutputPort,
) {
    @Transactional
    fun register(): TokenResponse {
        val user = userWriter.save(User())
        return generateTokenResponse(user)
    }

    fun refreshToken(refreshToken: String): TokenResponse {
        if (!jwtUtils.validateToken(refreshToken)) {
            throw InvalidJwtTokenException()
        }
        val uuid = jwtUtils.getUserUuidFromToken(refreshToken)
        val user = userReader.getUser(Uuid(uuid))
        return generateTokenResponse(user)
    }

    @Transactional
    fun loginWithGoogle(command: GoogleOAuthCommand): TokenResponse {
        val idToken = oAuthOutputPort.exchangeCodeForIdToken(command.code)
            ?: throw InvalidGoogleCodeException()
        val identifier = jwtUtils.getSubWithoutVerifying(idToken)
        val user = userReader.getUser(command.toUuid())
        val uuid = googleUserReader.findUuidByIdentifier(identifier)
        val isExistsUser = googleUserReader.existsByUuid(user.uuid)
        val isCurrentUserAlreadyLinked = uuid == null && isExistsUser
        if (isCurrentUserAlreadyLinked || uuid != user.uuid) {
            throw GoogleAccountAlreadyLinkedException()
        }
        val linkedUser = userReader.getUser(uuid)
        return generateTokenResponse(linkedUser)
    }

    private fun generateTokenResponse(user: User): TokenResponse {
        val newAccessToken = jwtUtils.generateAccessToken(user.uuid.value)
        val refreshToken = jwtUtils.generateRefreshToken(user.uuid.value)
        return TokenResponse(
            accessToken = newAccessToken,
            refreshToken = refreshToken,
            accessTokenExpiresIn = jwtProperties.accessTokenExpiration,
            refreshTokenExpiresIn = jwtProperties.refreshTokenExpiration
        )
    }
}
