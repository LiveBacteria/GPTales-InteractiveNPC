//=============================================================================
// CreateNPC.js
//=============================================================================

/*:
 * @plugindesc Creates and spawns an NPC on the map using specified parameters.
 * @author ChatGPT
 *
 * @help
 *
 * Plugin Command:
 *   createNPC npcName x y direction moveType  # Creates and spawns an NPC with specified parameters
 *
 * Example:
 *   createNPC Actor1 10 15 2 1                # Creates an NPC with "Actor1" sprite at (10, 15), facing down, and moving randomly
 */

(() => {
  function parseArgs(args) {
    return {
      npcName: args[0],
      x: parseInt(args[1], 10),
      y: parseInt(args[2], 10),
      direction: parseInt(args[3], 10),
      moveType: parseInt(args[4], 10),
    };
  }

  PluginManager.registerCommand("CreateNPC", "createNPC", (args) => {
    const { npcName, x, y, direction, moveType } = parseArgs(args);

    const event = {
      id: $gameMap._events.length,
      name: "CreatedNPC",
      note: "",
      pages: [
        {
          conditions: {
            actorId: 1,
            actorValid: false,
            itemId: 1,
            itemValid: false,
            selfSwitchCh: "A",
            selfSwitchValid: false,
            switch1Id: 1,
            switch1Valid: false,
            switch2Id: 1,
            switch2Valid: false,
            variableId: 1,
            variableValid: false,
            variableValue: 0,
          },
          directionFix: false,
          image: {
            tileId: 0,
            characterName: npcName,
            direction: direction,
            pattern: 1,
            characterIndex: 0,
          },
          list: [{ code: 0, indent: 0, parameters: [] }],
          moveFrequency: 3,
          moveRoute: {
            list: [{ code: 0, parameters: [] }],
            repeat: true,
            skippable: false,
            wait: false,
          },
          moveSpeed: 3,
          moveType: moveType,
          priorityType: 1,
          stepAnime: true,
          through: false,
          trigger: 0,
          walkAnime: true,
        },
      ],
      x: x,
      y: y,
    };

    $dataMap.events.push(event);
    const newEvent = new Game_Event(
      $gameMap._mapId,
      $gameMap._events.length - 1
    );
    $gameMap._events.push(newEvent);
    $gamePlayer.refresh();
  });
})();
