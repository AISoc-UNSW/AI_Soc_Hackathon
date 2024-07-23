import BattleScene from "#app/battle-scene.js";
import { PokeballType } from "#app/data/pokeball.js";
import { PlayerPokemon } from "#app/field/pokemon.js";
import { CommandPhase } from "#app/phases.js";
import { Command } from "#app/ui/command-ui-handler.js";

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
    commandPhase.handleCommand(Command.BALL, 4, []);
  }
};

/**
 * Issues a command to switch the active Pokemon.
 *
 * This function handles the command to switch the active Pokemon during battle.
 * It utilises the current command phase to execute the switch.
 * The index parameter corresponds to the index of the Pokemon in the list returned by GetParty or GetPartyNames.
 *
 * @param scene - The current BattleScene instance.
 * @param index - The index of the Pokemon to switch to in the party. Index is of the array returned by GetParty or GetPartyNames
 */
export const SwitchCommand = (scene: BattleScene, index: number) => {
  const commandPhase = scene.getCurrentPhase();
  if (commandPhase instanceof CommandPhase) {
    commandPhase.handleCommand(Command.POKEMON, index, false);
  }
};

/**
 * Retrieves the player's party of Pokemon.
 *
 * @param scene - The current BattleScene instance.
 * @returns {PlayerPokemon[]} - An array of PlayerPokemon objects representing the player's party.
 */
export const GetParty = (scene: BattleScene): PlayerPokemon[] => {
  return scene.getParty();
};

/**
 * Retrieves the names of the Pokemon in the player's party.
 *
 * @param scene - The current BattleScene instance.
 * @returns {string[]} - An array of strings representing the names of the Pokemon in the player's party.
 */
export const GetPartyNames = (scene: BattleScene): string[] => {
  return GetParty(scene).map((p) => p.name);
};

/**
 * Retrieves the current state of the battle.
 *
 * This function collects detailed information about the player's party, the enemy party,
 * and the current battle environment, including biome, weather, terrain, and whether it is a double battle.
 *
 * @param scene - The current BattleScene instance.
 * @returns {Object} - An object representing the current state of the battle, including player party stats, enemy party stats, and battle information.
 */
export const getBattleState = (scene: BattleScene) => {
  // Collect the player's party stats
  const partyStats = scene.getParty().map((pokemon) => {
    return {
      name: pokemon.name,
      hp: pokemon.hp,
      species: pokemon.species,
      moveset: pokemon.moveset,
    };
  });

  // Collect the enemy party stats
  const enemyStats = scene.currentBattle.enemyParty.map((pokemon) => {
    return {
      name: pokemon.name,
      hp: pokemon.hp,
      species: pokemon.species,
      moveset: pokemon.moveset,
    };
  });

  // Collect the current arena information
  const arena = scene.arena;
  const battleStats = {
    wave: scene.currentBattle.waveIndex,
    score: scene.score,
    biome: arena.biomeType,
    weather: arena.weather.weatherType,
    terrain: arena.terrain.terrainType,
    double: scene.currentBattle.double, // Indicates if it is currently a double Pokemon battle
  };

  // Consolidate the collected information into the battle state
  const battleState = {
    playerParty: partyStats,
    enemyParty: enemyStats,
    battleInfo: battleStats,
  };

  // Log the battle state to the console for debugging purposes
  console.log(battleState);

  // Return the battle state object
  return battleState;
};

/**
 * Retrieves the player's current money amount.
 *
 * @param scene - The current BattleScene instance.
 * @returns {number} - The current amount of money the player has.
 */
export const getMoney = (scene: BattleScene) => {
  return scene.money;
};
/**
 * Retrieves the current count of Pokeballs the player has.
 *
 * This function returns an object where the keys are the types of Pokeballs and the values are the corresponding counts.
 *
 * @param scene - The current BattleScene instance.
 * @returns {Object} - An object representing the count of each type of Pokeball the player possesses.
 */
export const getPokeballs = (scene: BattleScene) => {
  return scene.pokeballCounts;
};
