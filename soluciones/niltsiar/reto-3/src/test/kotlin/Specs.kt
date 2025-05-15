import io.kotest.core.spec.style.StringSpec
import io.kotest.inspectors.forAll
import io.kotest.matchers.nulls.shouldBeNull
import io.kotest.matchers.shouldBe

class Specs : StringSpec({

    "Find anti hacker character" {
        listOf(
            Response(status = "¡Ojo! ¡Este es el paso anti-hackers! Añade a la ruta que ya tienes una z minúscula y sigue jugando") to "z minúscula",
            Response(status = "¡Ojo! ¡Este es el paso anti-hackers! Añade a la ruta que ya tienes una a minúscula y sigue jugando") to "a minúscula",
            Response(status = "¡Ojo! ¡Este es el paso anti-hackers! Añade a la ruta que ya tienes una b mayúscula y sigue jugando") to "b mayúscula",
        ).forAll { testCase ->
            val result = findAntiHackerChar(testCase.first)
            result shouldBe testCase.second
        }
    }

    "Parse anti hacker character" {
        listOf(
            "z minúscula" to 'z',
            "A minúscula" to 'a',
            "b mayúscula" to 'B',
        ).forAll { testCase ->
            val result = parseAntiHackerChar(testCase.first)
            result shouldBe testCase.second
        }
    }

    "If anti hacker response is not valid return null" {
        val seed = Response(status = "This is not the anti hacker response you are looking for")
        val result = findAntiHackerChar(seed)
        result.shouldBeNull()
    }
})
