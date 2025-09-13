package com.speakon.domain.auth.implement

interface OAuthOutputPort {
    fun exchangeCodeForIdToken(code: String): String?
}
