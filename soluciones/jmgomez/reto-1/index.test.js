import { expect, test } from "vitest";
import decryptedMessage from ".";

test("La desepcriptación no admite message de tipo array", () => {
  const message = ["QWERTY"];
  const shift = 0;
  expect(() => decryptedMessage(message, shift)).toThrowError(
    "El mensaje debe ser una cadena de texto"
  );
});

test("La desepcriptación no admite una cadena con números", () => {
  const message = "QW3ERTY";
  const shift = 0;
  expect(() => decryptedMessage(message, shift)).toThrowError(
    "El mensaje debe ser una cadena de texto"
  );
});

test("La desepcriptación con un desplazamiento no númerico", () => {
  const message = "QWERTY";
  const shift = "1";
  expect(() => decryptedMessage(message, shift)).toThrowError(
    "El desplazamiento debe ser un número positivo"
  );
});

test("La desepcriptación con un desplazamiento negativo", () => {
  const message = "QWERTY";
  const shift = -1;
  expect(() => decryptedMessage(message, shift)).toThrowError(
    "El desplazamiento debe ser un número positivo"
  );
});

test("La desepcriptación con un desplazamiento igual a 0", () => {
  const message = "QWERTY";
  const shift = 0;
  expect(decryptedMessage(message, shift)).toBe("QWERTY");
});

test("Desafio miniAoc", () => {
  const message = "NVI EPVI YZ BVUOZGPBVOSZ";
  const shift = 5;
  expect(decryptedMessage(message, shift)).toBe("SAN JUAN DE GAZTELUGATXE");
});
