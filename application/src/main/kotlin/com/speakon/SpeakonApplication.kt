package com.speakon

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SpeakonApplication

fun main(args: Array<String>) {
    runApplication<SpeakonApplication>(*args)
}