package com.speakon.config.security.exception

import com.speakon.config.handler.UnauthorizedException

class InvalidJwtTokenException() : UnauthorizedException(message = "Invalid JWT token")
