package com.speakon

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.boot.runApplication

@SpringBootApplication
@ConfigurationPropertiesScan
class SpeakonApplication

fun main(args: Array<String>) {
    runApplication<SpeakonApplication>(*args)
}