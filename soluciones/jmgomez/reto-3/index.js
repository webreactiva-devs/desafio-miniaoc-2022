import fetch from "node-fetch";
import { DICCIONARY, INITIAL_URL, MATRIX } from "./constants.js";

async function getCoor(path) {
  const data = await Promise.all(
    MATRIX?.map(async (el) => {
      const coordToString = `{${el.x},${el.y}}`;
      const response = await fetch(
        "https://donde-esta-supercoco-delineas.vercel.app/api/reto/" + path,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            checkpoint: coordToString,
          }),
        }
      );
      if (response?.status === 200) {
        const data = await response.json();
        return String(data?.status)?.includes("anti-hackers") ? "z" : 1;
      }
      return "0";
    })
  );
  return String(data);
}

export function convertToCoords(str) {
  if (
    typeof str !== "string" ||
    (str.match(/C/g) ?? []).length !== 1 ||
    (str.match(/P/g) ?? []).length !== 2
  ) {
    console.log(str);
    throw new Error("La cadena no tiene un formato valido");
  }
  const coords = str.replaceAll("P", ".").replaceAll("C", ",");
  const coordsArray = coords.split(",");
  if (
    Number(coordsArray[0]) === Math.floor(coordsArray[0]) ||
    Number(coordsArray[1]) === Math.floor(coordsArray[1])
  ) {
    throw new Error("Las coordenadas no son válidas");
  }

  return coords;
}

async function getSuperCoco(coord) {
  const response = await fetch(
    "https://donde-esta-supercoco.vercel.app/api/reto/" + coord,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "JM",
      }),
    }
  );
  if (response?.status === 200) {
    const data = await response.json();
    return data;
  }
  return "No se encontró a Super Coco";
}

export default async function findSuperCoco(initial = INITIAL_URL) {
  let running = true;
  let url = initial;

  while (running) {
    const coords = await getCoor(url);
    const diccionaryCoincidence = DICCIONARY.findIndex(
      (el) => el.value === coords
    );
    running = diccionaryCoincidence !== -1;
    if (running) {
      url += DICCIONARY[diccionaryCoincidence].char;
    }
  }
  convertToCoords(url);
  return await getSuperCoco(url);
}
