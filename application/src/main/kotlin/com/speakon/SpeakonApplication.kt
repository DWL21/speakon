package com.speakon

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.boot.context.properties.EnableConfigurationProperties
import com.speakon.config.properties.FileStorageProperties
import org.springframework.scheduling.annotation.EnableAsync

@SpringBootApplication
@ConfigurationPropertiesScan
@EnableConfigurationProperties(FileStorageProperties::class)
@EnableJpaAuditing
@EnableAsync
class SpeakonApplication

fun main(args: Array<String>) {
    runApplication<SpeakonApplication>(*args)
}