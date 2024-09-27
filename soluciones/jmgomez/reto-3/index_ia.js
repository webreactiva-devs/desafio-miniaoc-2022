import fetch from "node-fetch";
import { createWorker, OEM, PSM } from "tesseract.js";
import * as fs from "fs";
// import * as prueba from "tesseract.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const svg64 = require("svg64");
const { convert } = require("convert-svg-to-png");
const { convert: covertJ } = require("convert-svg-to-jpeg");
const worker = createWorker({
  // logger: (m) => console.log(m),
});

// 7P1Cz12P3
async function svgToText(svg) {
  // const base64 = await svg64(svg);
  // const image = Buffer.from(base64.split(",")[1], "base64");
  // const image = await covert(svg);
  const image = await covertJ(svg);

  fs.writeFile(`public/image_${Math.random()}.jpg`, image, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
  const { data } = await worker.recognize(image);
  // const { data } = await worker.recognize(image, {
  //   rectangle: { top: 0, left: 0, width: 70, height: 70 },
  // });

  // console.log(data);
  if (data.text === "") {
    throw new Error("Caracter no detectado");
  }

  return data?.words?.[0]?.text;
}

const MATRIX = [
  { x: "0", y: "6", visible: false },
  { x: "0", y: "5", visible: false },
  { x: "0", y: "4", visible: false },
  { x: "0", y: "3", visible: false },
  { x: "0", y: "2", visible: false },
  { x: "0", y: "1", visible: false },
  { x: "0", y: "0", visible: false },
  { x: "1", y: "6", visible: false },
  { x: "1", y: "5", visible: false },
  { x: "1", y: "4", visible: false },
  { x: "1", y: "3", visible: false },
  { x: "1", y: "2", visible: false },
  { x: "1", y: "1", visible: false },
  { x: "1", y: "0", visible: false },
  { x: "2", y: "6", visible: false },
  { x: "2", y: "5", visible: false },
  { x: "2", y: "4", visible: false },
  { x: "2", y: "3", visible: false },
  { x: "2", y: "2", visible: false },
  { x: "2", y: "1", visible: false },
  { x: "2", y: "0", visible: false },
  { x: "3", y: "6", visible: false },
  { x: "3", y: "5", visible: false },
  { x: "3", y: "4", visible: false },
  { x: "3", y: "3", visible: false },
  { x: "3", y: "2", visible: false },
  { x: "3", y: "1", visible: false },
  { x: "3", y: "0", visible: false },
  { x: "4", y: "6", visible: false },
  { x: "4", y: "5", visible: false },
  { x: "4", y: "4", visible: false },
  { x: "4", y: "3", visible: false },
  { x: "4", y: "2", visible: false },
  { x: "4", y: "1", visible: false },
  { x: "4", y: "0", visible: false },
  { x: "5", y: "6", visible: false },
  { x: "5", y: "5", visible: false },
  { x: "5", y: "4", visible: false },
  { x: "5", y: "3", visible: false },
  { x: "5", y: "2", visible: false },
  { x: "5", y: "1", visible: false },
  { x: "5", y: "0", visible: false },
  { x: "6", y: "6", visible: false },
  { x: "6", y: "5", visible: false },
  { x: "6", y: "4", visible: false },
  { x: "6", y: "3", visible: false },
  { x: "6", y: "2", visible: false },
  { x: "6", y: "1", visible: false },
  { x: "6", y: "0", visible: false },
];

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
      if (response.status === 200) {
        const data = await response.json();
        const antiHacker = String(data?.status)?.includes("anti-hackers");
        return antiHacker
          ? { ...el, visible: true, antiHacker: true }
          : { ...el, visible: true };
      }
      return el;
    })
  );
  return data;
}

function generateSvg(coords) {
  // let svg = `<svg height="70" width="70" viewBox="0 0 7 7" xmlns="http://www.w3.org/2000/svg">`;
  // let svg = `<svg height="91" width="70" viewBox="-1 -1 9 9" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; transform: scaleY(1.3);">`;
  let svg = `<svg height="30" width="25" viewBox="-2 -2 10 10" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; transform: scaleY(1.3);">`;
  for (const coord of coords) {
    if (coord.visible) {
      svg += `<rect x="${coord.x}" y="${6 - coord.y}" width="1" height="1"/>`;
      // svg += `<rect x="${coord.x}" y="${
      //   6 - coord.y
      // }" width="1" height="1" style="fill: none;stroke: #000;stroke-dasharray: 2;"/>`;

      // svg += `<circle class="circulo" cx="${coord.x}" cy="${
      //   6 - coord.y
      // }" r="0.5" style="stroke: black;
      // stroke-width: 0.5;
      // fill: none;" />`;
    }
  }
  svg += `</svg>`;

  // console.log(svg);
  return svg;
}

export default async function findSuperCoco() {
  let running = true;
  let result = "3";

  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  await worker.setParameters({
    tessedit_char_whitelist: "0123456789PC",
    tessedit_pageseg_mode: PSM.SINGLE_CHAR,
  });

  while (running) {
    const coords = await getCoor(result);
    running = coords.some((el) => el?.visible);
    if (running) {
      const checkAntiHackers = coords.some((el) => el?.antiHacker);
      if (checkAntiHackers) {
        result += "z";
      } else {
        const svg = generateSvg(coords);
        const text = await svgToText(svg);
        result += text;
      }
      console.log(`{${result}}`);
    }
  }
  await worker.terminate();
}

findSuperCoco();
