package com.speakon.domain.auth.storage.exception

import com.speakon.config.handler.NotFoundException

class NotFoundUserException: NotFoundException(message = "User not found"){
}
