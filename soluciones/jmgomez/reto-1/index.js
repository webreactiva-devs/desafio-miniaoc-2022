const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export default function decryptedMessage(messageEncripted, shift) {
  if (
    typeof messageEncripted !== "string" ||
    messageEncripted.length <= 0 ||
    !/^[A-Z ]*$/.test(messageEncripted)
  ) {
    throw new Error("El mensaje debe ser una cadena de texto");
  }
  if (typeof shift !== "number" || shift < 0) {
    throw new Error("El desplazamiento debe ser un número positivo");
  }

  if (shift === 0) {
    return messageEncripted;
  }

  const arrayEncrypted = messageEncripted.split("");
  const arrayDecrypted = arrayEncrypted.map((el) => {
    if (el === " ") {
      return el;
    }
    const index = letters.findIndex((letter) => letter === el);
    const indexDesplazado = index + parseInt(shift);
    const letterDecrypted =
      letters[
        ((indexDesplazado % letters.length) + letters.length) % letters.length
      ];
    return letterDecrypted;
  });
  return arrayDecrypted.join("");
}
