"use strict";

import * as fs from "fs/promises";
import * as core from "@actions/core";

const diff = JSON.parse(process.env.DIFF);

const jsonPath =
  "../../" +
  diff.filter((file) => file.path.includes("vulnerability.json"))[0].path;

const jsonContents = await fs
  .readFile(jsonPath, "utf-8")
  .then(JSON.parse)
  .catch(() => {
    core.setFailed("The PR does not contain a readable vulnerability.json...");
  });

const cvss = jsonContents.CVSS;

switch (cvss.AV.toUpperCase()) {
  case "N":
  case "A":
  case "L":
  case "P":
  default:
    core.setFailed("Invalid AV vector was provided in the CVSS field.");
}

switch (cvss.AC.toUpperCase()) {
  case "L":
  case "H":
  default:
    core.setFailed("Invalid AC vector was provided in the CVSS field.");
}

switch (cvss.PR.toUpperCase()) {
  case "N":
  case "L":
  case "H":
  default:
    core.setFailed("Invalid PR vector was provided in the CVSS field.");
}

switch (cvss.UI.toUpperCase()) {
  case "N":
  case "R":
  default:
    core.setFailed("Invalid UI vector was provided in the CVSS field.");
}

switch (cvss.S.toUpperCase()) {
  case "U":
  case "C":
  default:
    core.setFailed("Invalid S vector was provided in the CVSS field.");
}

switch (cvss.C.toUpperCase()) {
  case "N":
  case "L":
  case "H":
  default:
    core.setFailed("Invalid C vector was provided in the CVSS field.");
}

switch (cvss.I.toUpperCase()) {
  case "N":
  case "L":
  case "H":
  default:
    core.setFailed("Invalid I vector was provided in the CVSS field.");
}

switch (cvss.A.toUpperCase()) {
  case "N":
  case "L":
  case "H":
  default:
    core.setFailed("Invalid A vector was provided in the CVSS field.");
}

switch (cvss.E.toUpperCase()) {
  case "X":
  case "U":
  case "P":
  case "F":
  case "H":
  default:
    core.setFailed("Invalid E vector was provided in the CVSS field.");
}

// Calculate score + append
