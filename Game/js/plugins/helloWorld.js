/*:
 * @target MZ
 * @author LiveBacteria
 * @plugindesc This is a Hello World plugin.
 * @help This is where help text goes.
 *
 * @command execute
 * @text execute
 * @desc Outputs Hello World to the console.
 *
 * @default 1
 */

(() => {
  PluginManager.registerCommand("helloWorld", "execute", function (args) {
    console.log("Hello World");
  });
})();
