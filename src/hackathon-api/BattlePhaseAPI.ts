import BattleScene from "#app/battle-scene.js";
import { PokeballType } from "#app/data/pokeball.js";
import { CommandPhase, FieldPhase } from "#app/phases.js";
import { Command } from "#app/ui/command-ui-handler.js";
import { Mode } from "#app/ui/ui";
export const BallCommand = (scene: BattleScene) => {
  const convertPokeballCounts = (counts: { [key: number]: number }) => {
    const result: { [key: string]: number } = {};
    for (const key in counts) {
      if (counts.hasOwnProperty(key)) {
        const enumKey = PokeballType[key as keyof typeof PokeballType];
        result[enumKey] = counts[key];
      }
    }

    return result;
  };

  const convertedPokeballCounts = convertPokeballCounts(scene.pokeballCounts);
  console.log(convertedPokeballCounts);
  const commandPhase = scene.getCurrentPhase();

  if (commandPhase instanceof CommandPhase) {
    commandPhase.handleCommand(Command.BALL, 0, []);
  }

  return;
};

export const FightCommand = (scene: BattleScene) => {
  console.log("hello world");
  const commandPhase = scene.getCurrentPhase();
  let playerPokemon;
  let commandScene;
  if (commandPhase instanceof CommandPhase) {
    commandScene = commandPhase;
    playerPokemon = scene.getPlayerField()[commandPhase.getFieldIndex()];
  }
  if (!commandScene) {
    return;
  }

  const moveQueue = playerPokemon.getMoveQueue();
  const queuedMove = moveQueue[0];
  commandScene.handleCommand(Command.FIGHT, 0);
  // while (moveQueue.length && moveQueue[0]
  //     && moveQueue[0].move && (!playerPokemon.getMoveset().find(m => m.moveId === moveQueue[0].move)
  //         || !playerPokemon.getMoveset()[playerPokemon.getMoveset().findIndex(m => m.moveId === moveQueue[0].move)].isUsable(playerPokemon, moveQueue[0].ignorePP))) {
  //     moveQueue.shift();
  // }

  // if (moveQueue.length) {
  //     const queuedMove = moveQueue[0];
  //     if (!queuedMove.move) {
  //         commandScene.handleCommand(Command.FIGHT, -1, false);
  //     } else {
  //         const moveIndex = playerPokemon.getMoveset().findIndex(m => m.moveId === queuedMove.move);
  //         if (moveIndex > -1 && playerPokemon.getMoveset()[moveIndex].isUsable(playerPokemon, queuedMove.ignorePP)) {
  //             commandScene.handleCommand(Command.FIGHT, moveIndex, queuedMove.ignorePP, { targets: queuedMove.targets, multiple: queuedMove.targets.length > 1 });
  //         } else {
  //             commandScene.scene.ui.setMode(Mode.COMMAND, commandScene.getFieldIndex());
  //         }
  //     }
  // } else {
  //     commandScene.ui.setMode(Mode.COMMAND, commandScene.getFieldIndex());
  // }

  // console.log(scene.getPlayerField()[])
  return;
};



// export const FightCommand = (scene: BattleScene) {

// }
export default BallCommand;
