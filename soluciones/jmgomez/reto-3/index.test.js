import { expect, test } from "vitest";
import findSuperCoco, { convertToCoords } from ".";

test("No se admite un array al convertir a coodenadas", async () => {
  const str = ["12P4C63PP3"];
  expect(() => convertToCoords(str)).toThrowError(
    "La cadena no tiene un formato valido"
  );
});

test("No se admite una cadena con formato no válido", async () => {
  const str = "12P4C63PP3";
  expect(() => convertToCoords(str)).toThrowError(
    "La cadena no tiene un formato valido"
  );
});

test("No se admite unas coordenadas que no cumplan con el formato", async () => {
  const str = "30P31C45P";
  expect(() => convertToCoords(str)).toThrowError(
    "Las coordenadas no son válidas"
  );
});

test("La conversión de una cadena a coordenadas se realiza bien", () => {
  const str = "30P31C45P1";
  expect(convertToCoords(str)).toEqual("30.31,45.1");
});

test("NO se encuentra SuperCoco", async () => {
  await expect(findSuperCoco("37P1Cz12P2")).resolves.toEqual(
    "No se encontró a Super Coco"
  );
});

test("Se encuentra SuperCoco", async () => {
  await expect(findSuperCoco()).resolves.toEqual({
    success: true,
    message_to_telegram:
      "¡Malandriners! He desbloqueado el tercer reto #desafíoMiniAOC 🎉  https://donde-esta-supercoco-premio.vercel.app/api/premio?name=JM&random=1",
    algo_para_ti:
      "https://donde-esta-supercoco-premio.vercel.app/api/premio?name=JM&random=1",
    where_is_supercoco:
      "Las coordenadas corresponden con https://www.youtube.com/watch?v=F6sCivv6ndQ",
  });
});
