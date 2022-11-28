const val hiddenMessage = "NVI EPVI YZ BVUOZGPBVOSZ"

fun main() {
    println(decrypt(hiddenMessage, 5))
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
