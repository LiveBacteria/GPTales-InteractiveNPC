/*:
 * @target MZ
 * @author LiveBacteria
 * @plugindesc This plugin can be used to execute various NPC utility functions.
 * @help This plugin can be used to execute various NPC utility functions.
 *
 * @command npcSpeak
 * @text npcSpeak
 * @desc Makes the NPC speak.
 *
 * @arg eventId
 * @type number
 * @text Event ID
 * @desc The ID of the event to make speak.
 * @default 1
 *
 * @arg message
 * @type text
 * @text Message
 * @desc The message for the NPC to say.
 * @default Hello, I'm an NPC!
 *
 * @command spawnNPC
 * @text Spawn NPC
 * @desc Spawns an NPC with given parameters.
 *
 * @arg x
 * @type number
 * @text X Coordinate
 * @desc The X coordinate where the NPC should be spawned.
 * @default 0
 *
 * @arg y
 * @type number
 * @text Y Coordinate
 * @desc The Y coordinate where the NPC should be spawned.
 * @default 0
 *
 * @arg eventId
 * @type number
 * @text Event ID on Spawn Map
 * @desc The Event ID on Spawn Map of the NPC to be spawned.
 * @default 0
 *
 * @arg mapId
 * @type number
 * @text Map ID of Spawn Map
 * @desc The ID of the map where the Event resides.
 * @default 0
 */

(() => {
  // Use this to call the plugin commands from other plugins.
  // PluginManager.callCommand(self, 'npcUtils', 'spawnNPC',{x: 1, y: 6, mapTarget: 1, eventId: 1})

  // Doesn't work at this time due to the way the plugin manager works.
  // Will likely need to call to an external reference for function calls instead.
  PluginManager.registerCommand("npcUtils", "npcSpeak", function (args) {
    const eventId = Number(args.eventId);
    const npcEvent = $gameMap.event(eventId);

    if (npcEvent) {
      // Determine message via Cardinal-LLM interaction in future branch, for now just use the message from the plugin command.
      const message = npcEvent.GPTales.memory.backstory;

      if (message !== undefined && message !== null && message !== "") {
        $gameMessage.add(message);
      } else {
        console.warn(`NPC with event ID ${eventId} does not have a message.`);
      }
    } else {
      console.warn(`NPC with event ID ${eventId} not found.`);
    }
  });

  // Utilises the GALV_EventSpawnerMZ plugin to spawn an NPC at a given location.
  PluginManager.registerCommand("npcUtils", "spawnNPC", function (args) {
    const x = Number(args.x);
    const y = Number(args.y);

    const mapTarget = args.mapTarget;
    const eventId = Number(args.eventId);

    // Utilises the GALV_EventSpawnerMZ plugin
    Galv.SPAWN.event(eventId, "xy", [x, y], "all", true, mapTarget);
    appendNPCFunctions($gameMap._lastSpawnEventId);
    // If needed: $gameMap._lastSpawnEventId
  });
})();

// Utility Funcitons

// Generate NPC Event Data
const generateNPCEventData = (npcData) => {
  const { characterName, pageData, functionCalls } = npcData;
};

const appendNPCFunctions = (npcEventId) => {
  const ref = $gameMap._events[npcEventId];
  ref.speak = function (message) {
    $gameMessage.add(message);
  };

  ref.GPTales = {};

  ref.GPTales.memory = {};

  ref.GPTales.memory.set = function (key, value) {
    this[key] = value;
  };

  ref.GPTales.memory.get = function (key) {
    return this[key];
  };

  ref.GPTales.memory.clear = function (key) {
    this[key] = undefined;
  };

  ref.GPTales.memory.has = function (key) {
    return this[key] !== undefined;
  };

  ref.GPTales.memory.keys = function () {
    return Object.keys(this);
  };

  ref.GPTales.memory.values = function () {
    return Object.values(this);
  };

  ref.GPTales.memory.backstory = "Hello traveler, I am an NPC.";

  ref.GPTales.memory.setBackstory = function (backstory) {
    this.backstory = backstory;
  };

  ref.GPTales.memory.getBackstory = function () {
    return this.backstory;
  };

  ref.GPTales.memory.illuminations = [];
};
