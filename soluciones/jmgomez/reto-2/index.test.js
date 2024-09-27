import { expect, test } from "vitest";
import findSuperCoco from ".";

test("No se admite unas coordenadas de tipo array", async () => {
  const input = ["{1233}"];
  // await expect(() => findSuperCoco(input)).rejects.toThrow();
  await expect(findSuperCoco(input)).rejects.toThrowError(
    "Las coordenadas no son válidas"
  );
});

test("No se admite unas coordenadas que no cumplan con el formato", async () => {
  const input = "{123}";
  await expect(findSuperCoco(input)).rejects.toThrowError(
    "Las coordenadas no son válidas"
  );
});

test("No se encuentra SuperCoco", async () => {
  const input = "{1223463}";
  await expect(findSuperCoco(input)).resolves.toEqual(
    "No se ha encontrado a SuperCoco"
  );
});

test("Se encuentra SuperCoco", async () => {
  const input = "{3311014444}";
  await expect(findSuperCoco(input)).resolves.toEqual({
    coord: "{-33.110,144.44}",
    data: {
      status: "¡No te puedo creer! ¡Has pillado a SuperCoco!",
      message_to_telegram:
        "¡El segundo reto desbloqueado! #desafíoMiniAOC 🥳 https://media.tenor.com/X15e67QrANUAAAAC/the-office.gif",
      supercoco_is_here:
        "https://donde-esta-supercoco.vercel.app/images/reto2-sfgdfw4.jpeg",
    },
  });
});
