import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe

class MyFirstTestClass : StringSpec({

    "my first test" {
        1 + 2 shouldBe 3
    }
})
