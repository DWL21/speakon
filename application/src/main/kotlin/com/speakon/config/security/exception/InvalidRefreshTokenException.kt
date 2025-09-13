package com.speakon.config.security.exception

import com.speakon.config.handler.UnauthorizedException

class InvalidRefreshTokenException() : UnauthorizedException(message = "Invalid refresh token")