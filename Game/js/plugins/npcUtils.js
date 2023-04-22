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
  // PluginManager.callCommand(self, 'npcUtils', 'spawnNPC',[])

  // Doesn't work at this time due to the way the plugin manager works.
  // Will likely need to call to an external reference for function calls instead.
  PluginManager.registerCommand("npcUtils", "npcSpeak", function (args) {
    const eventId = Number(args.eventId);
    const npc = $dataMap.events[eventId];
    if (npc && npc.speak) {
      npc.speak();
    } else {
      console.warn(
        `NPC with event ID ${eventId} not found or doesn't have a speak function.`
      );
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
  });
})();
