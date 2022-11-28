plugins {
    kotlin("jvm") version "1.7.21"
}

repositories {
    mavenCentral()
}

tasks {
    wrapper {
        gradleVersion = "7.5.1"
    }

    withType<Test>().configureEach {
        useJUnitPlatform()
    }
}

dependencies {
    testImplementation("io.kotest:kotest-runner-junit5:5.5.4")
    testImplementation("io.kotest:kotest-assertions-core:5.5.4")
}
