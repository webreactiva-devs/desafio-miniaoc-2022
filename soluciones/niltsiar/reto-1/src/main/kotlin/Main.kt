import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

const val hiddenMessage = "NVI EPVI YZ BVUOZGPBVOSZ"

@Serializable
data class Request(
    val solution: String,
)

@Serializable
data class Response(
    val status: String,
    @SerialName("message_to_telegram")
    val messagesToTelegram: String,
    @SerialName("supercoco_is_here")
    val whereIsSuperCoco: String,
    @SerialName("next_challenge")
    val nextChallenge: String,
)

suspend fun main() {
    val url = "https://donde-esta-supercoco-delineas.vercel.app/api/reto/1"
    val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json(Json {
                isLenient = true
                ignoreUnknownKeys = true
            })
        }
    }
    val response = client.post(url) {
        contentType(ContentType.Application.Json)
        setBody(Request(decrypt(hiddenMessage, 5)))
    }
    println(response.body<Response>())
    client.close()
}

fun decrypt(encryptedMessage: String, key: Int): String {

    require(encryptedMessage.all { it.isLetter() || it.isWhitespace() })

    return encryptedMessage
        .uppercase()
        .split(" ")
        .joinToString(" ") {
            it.map { char ->
                val newChar = char + (key % 26)
                if (newChar.code >= 91) newChar - 26
                else if (newChar.code < 65) newChar + 26
                else newChar
            }.joinToString("")
        }
}
