import io.kotest.core.spec.style.StringSpec
import io.kotest.inspectors.forAll
import io.kotest.matchers.booleans.shouldBeFalse
import io.kotest.matchers.booleans.shouldBeTrue
import io.kotest.matchers.collections.shouldContainExactlyInAnyOrder

class Specs : StringSpec({

    "Coordinates with decimals are created properly" {
        listOf(
            Coordinate("20", "35") to listOf(Coordinate("2.0", "3.5")),
            Coordinate("201", "351") to listOf(
                Coordinate("2.01", "3.51"),
                Coordinate("2.01", "35.1"),
                Coordinate("20.1", "3.51"),
                Coordinate("20.1", "35.1"),
            )
        ).forAll { testCase ->
            val result = testCase.first.generateCoordinatesWithDecimals()
            result shouldContainExactlyInAnyOrder testCase.second
        }
    }

    "Coordinates with negative components are generated properly" {
        val seed = Coordinate("2.0", "4.1")
        val expected = listOf(
            Coordinate("2.0", "4.1"),
            Coordinate("-2.0", "4.1"),
            Coordinate("2.0", "-4.1"),
            Coordinate("-2.0", "-4.1"),
        )

        val combinations = seed.generateNegativeCombinations()

        combinations shouldContainExactlyInAnyOrder expected
    }

    "Coordinates have valid components" {
        listOf(
            Coordinate("2.0", "3.5"),
            Coordinate("-89.9", "179.99")
        ).forAll { testCase ->
            testCase.hasValidComponents().shouldBeTrue()
        }
    }

    "Coordinates have invalid components" {
        listOf(
            Coordinate("200.0", "3.5"),
            Coordinate("-89.9", "-181.99")
        ).forAll { testCase ->
            testCase.hasValidComponents().shouldBeFalse()
        }
    }
})
