import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.plugins.logging.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

suspend fun main() {
    val baseUrl = "https://donde-esta-supercoco.vercel.app/api/reto/3"
    val client = createHttpClient()

    val hiddenUrl = findValidUrl(baseUrl, validUrlChars, client)

    val superCocoLocation = client.post(hiddenUrl) {
        contentType(ContentType.Application.Json)
        setBody(RequestForSuperCoco("EL TROL"))
    }

    try {
        println(superCocoLocation.body<ResponseForSuperCoco>())
    } catch (e: Exception) {
        println("Supercoco hasn't been found 😞")
    }

    client.close()
}

suspend fun findValidUrl(baseUrl: String, testChars: List<Char>, client: HttpClient): String {
    for (index in testChars.indices) {
        val testUrl = baseUrl + testChars[index]

        println("🔎 Searching for url 👀: $testUrl")

        val response = client.get(testUrl) {
            contentType(ContentType.Text.Plain)
        }

        if (response.bodyAsText() == errorBodyInValidUrl) {
            return findValidUrl(testUrl, testChars, client)
        }
    }

    val antiHackerChar = checkAntiHacker(baseUrl, client)
    return if (null != antiHackerChar) {
        findValidUrl(baseUrl + antiHackerChar, testChars, client)
    } else {
        baseUrl
    }
}

suspend fun checkAntiHacker(baseUrl: String, client: HttpClient): Char? {
    val response = client.post(baseUrl) {
        contentType(ContentType.Application.Json)
        setBody(testRequest)
    }

    return try {
        val parsedResponse = response.body<Response>()
        val antiHacker = findAntiHackerChar(parsedResponse)

        return antiHacker?.let { parseAntiHackerChar(it) }
    } catch (_: Exception) {
        null
    }
}

fun findAntiHackerChar(response: Response): String? {
    val startingDelimiter = "la ruta que ya tienes una "
    val endingDelimiter = " y sigue jugando"
    val startIndex = response.status.indexOf(startingDelimiter) + startingDelimiter.length
    val endIndex = response.status.indexOf(endingDelimiter)

    return when {
        startIndex == -1 || endIndex == -1 -> null // if delimiters are not found
        startIndex > endIndex -> null // if startingDelimiter found after endingDelimiter
        else -> response.status.substring(startIndex, endIndex)
    }
}

fun parseAntiHackerChar(input: String): Char? {
    val normalizedInput = input.lowercase()
    return when {
        normalizedInput.contains("minúscula")
                || normalizedInput.contains("minuscula") -> normalizedInput.first()

        normalizedInput.contains("mayúscula")
                || normalizedInput.contains("mayuscula") -> normalizedInput.uppercase().first()

        else -> null
    }
}

@Serializable
data class Request(
    val checkpoint: String,
)

@Serializable
data class RequestForSuperCoco(
    val name: String,
)

@Serializable
data class Response(
    val status: String,
)

@Serializable
data class ResponseForSuperCoco(
    val success: Boolean? = null,
    @SerialName("message_to_telegram")
    val messagesToTelegram: String? = null,
    @SerialName("supercoco_is_here")
    val whereIsSuperCoco: String? = null,
    @SerialName("algo_para_ti")
    val somethingForYou: String? = null,
)

val testRequest = Request("{0,0}")
val validUrlChars = listOf('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'P', 'C')
const val errorBodyInValidUrl = "{\"error\":\"URL not found\"}"

fun createHttpClient(): HttpClient {
    return HttpClient(CIO) {
        install(ContentNegotiation) {
            json(Json {
                isLenient = true
                ignoreUnknownKeys = true
            })
        }
        install(Logging) {
            level = LogLevel.BODY
            logger = object : Logger {
                override fun log(message: String) {
                    //println(message)
                }
            }
        }
    }
}
