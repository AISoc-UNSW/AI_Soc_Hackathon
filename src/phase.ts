import BattleScene from "./battle-scene";
import { FightCommand, RunCommand } from "#app/hackathon-api/BattlePhaseAPI"
import { CommandPhase } from "./phases";

export class Phase {
    protected scene: BattleScene;

    constructor(scene: BattleScene) {
        this.scene = scene;
    }

    start() {
        console.log(`%cStart Phase ${this.constructor.name}`, "color:green;");
        const currentPhase = this.scene.getCurrentPhase();
        if (currentPhase instanceof CommandPhase) {
            setTimeout(() => {
                RunCommand(this.scene)
                // FightCommand(this.scene)
            }, 1);

        }
        if (this.scene.abilityBar.shown) {
            this.scene.abilityBar.resetAutoHideTimer();
        }
    }

    end() {
        const phase = this.scene.getCurrentPhase();
        console.log("this is the phase", phase);
        this.scene.shiftPhase();
    }
}
