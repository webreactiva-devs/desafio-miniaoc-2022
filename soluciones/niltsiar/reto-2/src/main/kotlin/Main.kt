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
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

const val magicCoordinate = "{3311014444}"

@Serializable
data class Coordinate(
    val latitude: String,
    val longitude: String,
) {
    override fun toString(): String = "{$latitude,$longitude}"
}

@Serializable
data class Request(
    val solution: String,
)

@Serializable
data class Response(
    val status: String,
    @SerialName("message_to_telegram")
    val messagesToTelegram: String? = null,
    @SerialName("supercoco_is_here")
    val whereIsSuperCoco: String? = null,
)

suspend fun main() {
    val url = "https://donde-esta-supercoco-delineas.vercel.app/api/reto/2"
    val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json(Json {
                isLenient = true
                ignoreUnknownKeys = true
            })
        }
    }

    val coordinates = generateCoordinates(magicCoordinate)

    val networkCalls = coordinates.map { possibleCoordinate ->
        GlobalScope.async {
            val response = client.post(url) {
                contentType(ContentType.Application.Json)
                setBody(Request(possibleCoordinate.toString()))
            }
            response.body<Response>() to possibleCoordinate
        }
    }
    val results = networkCalls.awaitAll()
    results.filterNot { result -> result.first.whereIsSuperCoco.isNullOrBlank() }
        .forEach { result ->
            println("Coordinates: ${result.second}")
            println(result.first)
        }
    client.close()
}

fun generateCoordinates(input: String): List<Coordinate> {
    // remove curly brackets
    val digits = input.slice(1 until input.lastIndex)
    return digits.toCharArray()
        .foldIndexed(emptyList<Coordinate>()) { index, acc, _ ->
            acc + Coordinate(digits.take(index), digits.drop(index))
        }
        // we need at least two digits each component
        .filter { coordinate ->
            coordinate.latitude.length >= 2 && coordinate.longitude.length >= 2
        }
        .filter { it.latitude.isNotBlank() && it.longitude.isNotBlank() }
        // first character cannot be 0
        .filter { coordinate ->
            coordinate.latitude.first() != '0' && coordinate.longitude.first() != '0'
        }
        .fold<Coordinate, List<Coordinate>>(emptyList()) { acc, coordinate ->
            acc + coordinate.generateCoordinatesWithDecimals()
        }
        // filter invalid latitudes
        .filter { coordinate ->
            coordinate.latitude.toDouble() < 90.0
        }
        // filter invalid longitudes
        .filter { coordinate ->
            coordinate.longitude.toDouble() < 180.0
        }
        .fold(emptyList()) { acc, coordinate ->
            acc + coordinate.generateNegativeCombinations()
        }
}

fun Coordinate.generateCoordinatesWithDecimals(): List<Coordinate> {
    val possibleLatitudes = latitude.foldIndexed(emptyList<String>()) { index, acc, _ ->
        acc + listOf(latitude.take(index), latitude.drop(index)).joinToString(".")
    }
        .filterNot { latitude -> latitude.first() == '.' }

    val possibleLongitues = longitude.foldIndexed(emptyList<String>()) { index, acc, _ ->
        acc + listOf(longitude.take(index), longitude.drop(index)).joinToString(".")
    }
        .filterNot { longitude -> longitude.first() == '.' }

    return possibleLatitudes.fold(emptyList()) { acc, latitude ->
        acc + possibleLongitues.fold(emptyList()) { acc2, longitude ->
            acc2 + Coordinate(latitude, longitude)
        }
    }
}

fun Coordinate.generateNegativeCombinations(): List<Coordinate> {
    return listOf(
        this,
        Coordinate("-$latitude", longitude),
        Coordinate(latitude, "-$longitude"),
        Coordinate("-$latitude", "-$longitude")
    )
}


