# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Build and Run
- `./gradlew bootRun` - Run the Spring Boot application (port 8080, context path /api)
- `./gradlew build` - Build the project and run all tests
- `./gradlew clean build` - Clean and rebuild from scratch
- `./gradlew bootJar` - Create executable JAR file

### Testing
- `./gradlew test` - Run all tests
- `./gradlew test --tests "ClassName"` - Run specific test class
- `./gradlew test --tests "ClassName.methodName"` - Run specific test method

### Development
- `./gradlew clean` - Clean build artifacts
- `./gradlew check` - Run all verification tasks
- `./gradlew dependencies` - Show project dependencies

## Architecture

### Tech Stack
- **Language**: Kotlin 1.9.25 with Java 21
- **Framework**: Spring Boot 3.3.5
- **Build Tool**: Gradle 8.10 with Kotlin DSL
- **Database**: H2 (local), PostgreSQL (production)
- **Query Builder**: QueryDSL 5.1.0 for type-safe queries

### Project Structure
The application follows standard Spring Boot conventions with Kotlin:
- Main application class: `com.speakon.SpeakonApplication`
- Configuration classes in `com.speakon.config/`
- Properties classes in `com.speakon.config.properties/`
- Resources in `src/main/resources/`

### Configuration Management
- **Application Profiles**: local (default), dev, prod
- **Main Config**: `src/main/resources/application.yml`
- **Logging Config**: `src/main/resources/logback-spring.xml`
- **CORS**: Configured in `WebConfig.kt` to allow `http://localhost:3000`

### Database Configuration
- **Local Profile**: H2 in-memory database, DDL auto-create
- **Production Profile**: PostgreSQL with connection pooling
- **JPA**: Hibernate with show-sql enabled for development

### API Structure
- Base path: `/api` (configured in application.yml)
- Actuator endpoints: `/api/actuator/health`, `/api/actuator/info`
- CORS enabled for frontend development

### QueryDSL Integration
QueryDSL is configured for type-safe database queries. The `QueryDslConfig` class provides the JPAQueryFactory bean. When creating repositories, use QueryDSL for complex queries rather than JPQL strings.

### Logging Strategy
- **Local**: DEBUG level, console output only
- **Dev**: DEBUG level, console + file output
- **Prod**: INFO level, file rotation (100MB max, 14-day retention)

### CI/CD Automation
The project includes GitHub Actions workflows for:
- Automated PR reviews using Claude AI (`.github/workflows/claude-pr.yml`)
- Issue handling automation
- Korean language code review comments with severity indicators

When making changes, ensure your code will pass the automated review checks which look for code quality, security issues, and best practices.