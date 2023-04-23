// This file contains the function exports that interact and make calls to the Cardinal System.

const fs = require("fs");
const path = require("path");

const { Cardinal } = require(".GPTales/Cardinal");

const main = function () {
  const context = fs.readFileSync(
    path.join(__dirname, "GPTales/gameContext.json"),
    "utf8"
  );

  const gameContext = JSON.parse(context);

  const cardinal = new Cardinal(gameContext);

  cardinal.start();
};

exports.main = main;

main();
