package com.speakon.domain.file.implement.exception

import com.speakon.config.handler.BadRequestException

class NoFileExtensionException: BadRequestException(message = "File has no extension") {
}
