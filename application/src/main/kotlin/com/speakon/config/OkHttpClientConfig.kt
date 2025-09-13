package com.speakon.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import okhttp3.OkHttpClient

@Configuration
class OkHttpClientConfig {
    @Bean
    fun okHttpClient(): OkHttpClient {
        return OkHttpClient.Builder()
            .build()
    }
}
