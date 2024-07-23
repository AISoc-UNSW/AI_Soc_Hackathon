import BattleScene from "#app/battle-scene.js";
import Battle from "#app/battle.js";
import { PokeballType } from "#app/data/pokeball.js";
import { PlayerPokemon } from "#app/field/pokemon.js";
import { battle } from "#app/locales/de/battle.js";
import { CommandPhase } from "#app/phases.js";
import { Command } from "#app/ui/command-ui-handler.js";
import { Mode } from "#app/ui/ui.js";

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
 * Issues a command to switch the active Pokémon.
 *
 * This function handles the command to switch the active Pokémon during battle.
 * It utilises the current command phase to execute the switch.
 * The index parameter corresponds to the index of the Pokémon in the list returned by GetParty or GetPartyNames.
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
 * Retrieves the player's party of Pokémon.
 *
 * @param scene - The current BattleScene instance.
 * @returns {PlayerPokemon[]} - An array of PlayerPokemon objects representing the player's party.
 */
export const GetParty = (scene: BattleScene): PlayerPokemon[] => {
    return scene.getParty();
};

/**
 * Retrieves the names of the Pokémon in the player's party.
 *
 * @param scene - The current BattleScene instance.
 * @returns {string[]} - An array of strings representing the names of the Pokémon in the player's party.
 */
export const GetPartyNames = (scene: BattleScene): string[] => {
    return GetParty(scene).map((p) => p.name);
};

export const getBattleState = (scene: BattleScene) => {
    const partyStats = scene.getParty().map((pokemon) => {
        return {
            name: pokemon.name,
            hp: pokemon.hp,
            species: pokemon.species,
            moveset: pokemon.moveset,
        };
    });
    const enemyStats = scene.currentBattle.enemyParty.map((pokemon) => {
        return {
            name: pokemon.name,
            hp: pokemon.hp,
            species: pokemon.species,
            moveset: pokemon.moveset,
        };
    });
    const battleState = {
        playerParty: partyStats,
        enemyParty: enemyStats,
    };
    console.log(battleState);
};
