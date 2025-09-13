package com.speakon.config

import com.speakon.config.properties.CorsProperties
import com.speakon.resolver.UserUuidArgumentResolver
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod.*
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
@EnableConfigurationProperties(CorsProperties::class)
class WebConfig(
    private val userUuidArgumentResolver: UserUuidArgumentResolver
) {
    @Bean
    fun webMvcConfigurer(corsProperties: CorsProperties): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/**")
                    .allowedOrigins(corsProperties.allowedOrigin ?: "*")
                    .allowedHeaders("*")
                    .allowedMethods(GET.name(), POST.name(), PUT.name(), DELETE.name(), OPTIONS.name())
                    .allowCredentials(false)
            }

            override fun addArgumentResolvers(resolvers: MutableList<HandlerMethodArgumentResolver>) {
                resolvers.add(userUuidArgumentResolver)
            }
        }
    }
}