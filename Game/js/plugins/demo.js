/*:
 * @target MZ
 * @author ChatGPT
 * @plugindesc This is a demo plugin.
 * @help This is a demo plugin.
 *
 * @command npcSpeak
 * @text NPC Speak
 * @desc Makes the NPC speak.
 *
 * @arg eventId
 * @type number
 * @text Event ID
 * @desc The ID of the event to make speak.
 * @default 1
 */

(() => {
  const _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
  Scene_Map.prototype.onMapLoaded = function () {
    _Scene_Map_onMapLoaded.call(this);
    setupNPC(0, 0);
  };

  function setupNPC(x, y) {
    const npcEventData = createNPCEventData(x, y);
    const eventId = $dataMap.events.length;
    $dataMap.events.push(npcEventData);

    const event = new Game_Event($gameMap.mapId(), eventId);
    $gameMap._events[eventId] = event;
  }

  function createNPCEventData(x, y) {
    return {
      id: $dataMap.events.length,
      name: "CreatedNPC",
      note: "",
      pages: [
        // Pages object here...
      ],
      x: x,
      y: y,
      speak() {
        console.log("Hello!");
      },
    };
  }

  PluginManager.registerCommand("ChatGPT", "npcSpeak", function (args) {
    console.log("test");
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
})();
