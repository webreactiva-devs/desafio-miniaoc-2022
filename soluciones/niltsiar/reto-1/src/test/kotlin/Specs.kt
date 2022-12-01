import io.kotest.assertions.throwables.shouldThrow
import io.kotest.core.spec.style.StringSpec
import io.kotest.inspectors.forAll
import io.kotest.matchers.shouldBe

class Specs : StringSpec({

    "Letters are ciphered properly" {
        val input = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        val expectecOuput = "BCDEFGHIJKLMNOPQRSTUVWXYZA"

        decrypt(input, 1) shouldBe expectecOuput
    }

    "lowercase letters are treated as uppercase letters" {
        val input = "abcdefghijklmnopqrstuvwxyz"
        val expectecOuput = "BCDEFGHIJKLMNOPQRSTUVWXYZA"

        decrypt(input, 1) shouldBe expectecOuput
    }

    "if input is not letters throw exception" {
        listOf("1", "@", "!")
            .forAll { input ->
                shouldThrow<IllegalArgumentException> {
                    decrypt(input, 1)
                }
            }
    }

    "spaces are kept" {
        val input = "ABC DEF"
        val expectedOutput = "BCD EFG"
        decrypt(input, 1) shouldBe expectedOutput
    }

    "Key works for numbers bigger that the number of letters" {
        val input = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        val expectecOuput = "BCDEFGHIJKLMNOPQRSTUVWXYZA"

        decrypt(input, 27) shouldBe expectecOuput
    }

    "Key works for negative numbers" {
        val input = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        val expectecOuput = "ZABCDEFGHIJKLMNOPQRSTUVWXY"

        decrypt(input, -1) shouldBe expectecOuput
    }

    "Key works for more negative numbers" {
        val input = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        val expectecOuput = "ZABCDEFGHIJKLMNOPQRSTUVWXY"

        decrypt(input, -27) shouldBe expectecOuput
    }
})
