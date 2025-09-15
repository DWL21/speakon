package com.speakon.config

import io.github.oshai.kotlinlogging.KotlinLogging
import org.jodconverter.core.DocumentConverter
import org.jodconverter.core.office.OfficeException
import org.jodconverter.core.office.OfficeManager
import org.jodconverter.local.LocalConverter
import org.jodconverter.local.office.LocalOfficeManager
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.stereotype.Component
import jakarta.annotation.PreDestroy

@Component
@ConfigurationProperties(prefix = "jodconverter")
data class JodConverterProperties(
    var enabled: Boolean = false,
    var officeHome: String? = null,
    var portNumbers: String = "2002",
    var maxTasksPerProcess: Int = 10,
    var processTimeout: Long = 120000L,
    var taskExecutionTimeout: Long = 60000L,
    var taskQueueTimeout: Long = 30000L
)

@Configuration
@ConditionalOnProperty(
    name = ["jodconverter.enabled"],
    havingValue = "true",
    matchIfMissing = false
)
class LibreOfficeConfig(
    private val properties: JodConverterProperties
) {
    private val logger = KotlinLogging.logger {}
    private var officeManager: OfficeManager? = null

    @Bean
    fun officeManager(): OfficeManager {
        val builder = LocalOfficeManager.builder()

        properties.officeHome?.let {
            builder.officeHome(it)
        }

        val portNumbers = properties.portNumbers.split(",").map { it.trim().toInt() }.toIntArray()

        officeManager = builder
            .portNumbers(*portNumbers)
            .maxTasksPerProcess(properties.maxTasksPerProcess)
            .processTimeout(properties.processTimeout)
            .taskExecutionTimeout(properties.taskExecutionTimeout)
            .taskQueueTimeout(properties.taskQueueTimeout)
            .build()

        try {
            officeManager?.start()
            logger.info { "LibreOffice started successfully on ports: ${portNumbers.joinToString()}" }
        } catch (e: OfficeException) {
            logger.error(e) { "Failed to start LibreOffice" }
            throw RuntimeException("Failed to start LibreOffice. Make sure LibreOffice is installed.", e)
        }

        return officeManager!!
    }

    @Bean
    fun documentConverter(officeManager: OfficeManager): DocumentConverter {
        return LocalConverter.builder()
            .officeManager(officeManager)
            .build()
    }

    @PreDestroy
    fun stopOfficeManager() {
        officeManager?.let {
            try {
                it.stop()
                logger.info { "LibreOffice stopped successfully" }
            } catch (e: OfficeException) {
                logger.error(e) { "Error stopping LibreOffice" }
            }
        }
    }
}