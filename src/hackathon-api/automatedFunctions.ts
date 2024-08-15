import BattleScene, { PokeballCounts } from "#app/battle-scene.js";
import Battle from "#app/battle.js";
import { PokeballType } from "#app/data/pokeball.js";
import PokemonSpecies from "#app/data/pokemon-species.js";
import { Terrain } from "#app/data/terrain.js";
import { Weather } from "#app/data/weather.js";
import { Biome } from "#app/enums/biome.js";
import { PlayerPokemon, PokemonMove } from "#app/field/pokemon.js";
import { battle } from "#app/locales/de/battle.js";
import { CommandPhase } from "#app/phases.js";
import { Command } from "#app/ui/command-ui-handler.js";
import { Mode } from "#app/ui/ui.js";

/**
 * AutomatedFunctions class
 *
 * This class encapsulates all the functions used to automate gameplay in the Pokerogue game,
 * as well as helper functions to retrieve the current state of the game.
 *
 * It provides methods for:
 * - Executing game commands (e.g., using Pokeballs, switching Pokemon)
 * - Retrieving information about the player's party
 * - Obtaining the current battle state
 */

export class AutomatedFunctions {
    public battleScene: BattleScene;
    public battleState: BattleState;

    constructor(battleScene: BattleScene) {
        this.battleScene = battleScene;
        this.battleState = new BattleState(battleScene);
    }

    updateBattleState() {
        this.battleState = new BattleState(this.battleScene);
    }

    BallCommand = (cursor: integer) => {
        const commandPhase = this.battleScene.getCurrentPhase();

        if (commandPhase instanceof CommandPhase) {
            commandPhase.handleCommand(Command.BALL, cursor, []);
        }
    };

    /**
     * Issues a command to switch the active Pokémon.
     *
     * This function handles the command to switch the active Pokémon during battle.
     * It utilises the current command phase to execute the switch.
     * The index parameter corresponds to the index of the Pokémon in the list returned by GetParty or GetPartyNames.
     *
     * @param index - The index of the Pokemon to switch to in the party. Index is of the array returned by GetParty or GetPartyNames
     */
    SwitchCommand = (index: number) => {
        const commandPhase = this.battleScene.getCurrentPhase();
        if (commandPhase instanceof CommandPhase) {
            commandPhase.handleCommand(Command.POKEMON, index, false);
        }
    };

    /**
     * Retrieves the player's party of Pokémon.
     *
     * @returns {PlayerPokemon[]} - An array of PlayerPokemon objects representing the player's party.
     */
    GetParty = (): PlayerPokemon[] => {
        return this.battleScene.getParty();
    };

    /**
     * Retrieves the names of the Pokémon in the player's party.
     *
     * @returns {string[]} - An array of strings representing the names of the Pokémon in the player's party.
     */
    GetPartyNames = (): string[] => {
        return this.GetParty().map((p) => p.name);
    };
}

class PokemonStats {
    // TODO: Add Pokemon types
    // TODO: Add status effects
    // Potentially need to add gender and mood of pokemon maybe?
    public name: string;
    public hp: number;
    public species: PokemonSpecies;
    public moveset: PokemonMove[];

    constructor(
        name: string,
        hp: number,
        species: PokemonSpecies,
        moveset: PokemonMove[]
    ) {
        this.name = name;
        this.hp = hp;
        this.species = species;
        this.moveset = moveset;
    }
}

class BattleState {
    public allyStats: PokemonStats[];
    public enemyStats: PokemonStats[] | null;
    public pokeballCounts: PokeballCounts;
    public wave: integer;
    public score: number;
    public biome: Biome;
    public weather: Weather;
    public terrain: Terrain;
    public doubleBattle: boolean;
    // TODO: May need to add more info

    constructor(battleScene: BattleScene) {
        // Get Ally and Enemy Pokemon Stats
        this.allyStats = battleScene
            .getParty()
            .map(
                (pokemon) =>
                    new PokemonStats(
                        pokemon.name,
                        pokemon.hp,
                        pokemon.species,
                        pokemon.moveset
                    )
            );

        // Check if currentBattle and enemyParty are not null before mapping over enemyParty
        this.enemyStats =
            battleScene.currentBattle && battleScene.currentBattle.enemyParty
                ? battleScene.currentBattle.enemyParty.map(
                      (pokemon) =>
                          new PokemonStats(
                              pokemon.name,
                              pokemon.hp,
                              pokemon.species,
                              pokemon.moveset
                          )
                  )
                : null;

        this.pokeballCounts = battleScene.pokeballCounts;
        this.wave = battleScene.currentBattle.waveIndex;
        this.score = battleScene.score;
        this.biome = battleScene.arena.biomeType;
        this.weather = battleScene.arena.weather;
        this.terrain = battleScene.arena.terrain;
        this.doubleBattle = battleScene.currentBattle.double;
    }
    // Printing out pokeball count function
    // const convertPokeballCounts = (counts: { [key: number]: number }) => {
    //     const result: { [key: string]: number } = {};
    //     for (const key in counts) {
    //         if (counts.hasOwnProperty(key)) {
    //             const enumKey =
    //                 PokeballType[key as keyof typeof PokeballType];
    //             result[enumKey] = counts[key];
    //         }
    //     }
    //     return result;
    // };

    // const convertedPokeballCounts = convertPokeballCounts(
    //     this.battleScene.pokeballCounts
    // );
}
