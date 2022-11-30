import fetch from "node-fetch";

function cleanInput(str) {
  if (typeof str !== "string" || !/^\{[\d]{4,}\}$/.test(str)) {
    throw new Error("Las coordenadas no son válidas");
  }
  return str.slice(1, -1);
}

function getDecimals(str) {
  const decimals = [];
  for (let i = 0; i < str.length; i++) {
    if (i === 0 || i === str.length) {
      continue;
    }
    const decimal = str.slice(0, i) + "." + str.slice(i);
    decimals.push(decimal);
  }
  return decimals;
}

function getPausiblesValues(str) {
  const total = [];
  for (let i = 0; i < str.length; i++) {
    if (i === 0 || i === str.length) {
      continue;
    }
    const elementSliced = [str.slice(0, i), str.slice(i)];
    const elementSlicedCheck = elementSliced.filter(
      (el) => el.length >= 2 && el[0] !== "0"
    );
    if (elementSlicedCheck.length === 2) {
      total.push(elementSlicedCheck);
    }
  }
  return total;
}

function getPausiblesDecimals(arr) {
  return arr?.reduce((acc, el) => {
    const lats = getDecimals(el[0]);
    const logs = getDecimals(el[1]);
    const coords = [];
    for (let i = 0; i < lats.length; i++) {
      for (let j = 0; j < logs.length; j++) {
        coords.push(`${lats[i]},${logs[j]}`);
      }
    }
    const total = acc.concat(coords);
    return total;
  }, []);
}

function formatCoords(arr) {
  return arr?.reduce((acc, el) => {
    const [lat, long] = el.split(",");
    const total = acc.concat([
      `{${lat},${long}}`,
      `{${lat},-${long}}`,
      `{-${lat},${long}}`,
      `{-${lat},-${long}}`,
    ]);
    return total;
  }, []);
}

async function validateCoords(arr) {
  return await Promise.all(
    arr?.map(async (coord) => {
      const response = await fetch(
        "https://donde-esta-supercoco-delineas.vercel.app/api/reto/2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            solution: coord,
          }),
        }
      );
      const data = await response.json();
      return { coord, data };
    })
  );
}

export default async function findSuperCoco(input) {
  const inputClean = cleanInput(input);
  const pausiblesValues = getPausiblesValues(inputClean);
  const pausiblesDecimals = getPausiblesDecimals(pausiblesValues);
  const uniquesDecimals = [...new Set(pausiblesDecimals)];
  const coords = formatCoords(uniquesDecimals);
  const responses = await validateCoords(coords);

  const validCoords = responses.filter(
    (el) =>
      el?.data?.status !== "Intenténtalo de nuevo, malandriner nunca se rinde"
  );

  // const validCoords= responses.find((el)=>el?.data?.status === "¡Bien hecho, SuperCoco! Estás en el lugar correcto")

  if (validCoords.length === 1) {
    return validCoords[0];
  }
  return "No se ha encontrado a SuperCoco";
}
