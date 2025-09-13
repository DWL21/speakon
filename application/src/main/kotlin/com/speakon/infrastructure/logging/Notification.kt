package com.speakon.infrastructure.logging

import io.github.oshai.kotlinlogging.KotlinLogging

private val logger = KotlinLogging.logger {}

object Notification {
    fun notify() {
    }

    private fun validateMessage(message: String): String {
        val sanitizedMessage = message.replace(Regex("[\\r\\n\\t\\x0b\\x0c\\s]+"), "")
        return sanitizedMessage.filter { it.isISOControl().not() }
    }
}
